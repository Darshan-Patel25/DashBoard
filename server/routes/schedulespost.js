const express = require("express");
const cron = require("node-cron");
const { Client } = require("twitter-api-sdk");
const ScheduledPost = require("../models/schedulePost");
const {
  Schedulepostroute,
  gettelegrambotpost,
  getdashboardpost,
} = require("../controllers/schedulepost");
const router = express.Router();
const moment = require("moment");
const { auth } = require("../middlewares/auth");
const User = require("../models/user");
const sendPostSuccessEmail = require("../mailTemplates/postsuccesmail");
// const { sendPostSuccessEmail } = require("../mailTemplates/postsuccesmail");
const { scheduledmessages } = require("../controllers/showAllPost");
const { getPostedPosts } = require("../controllers/showPostedPost");
router.get("/showallpost", auth, scheduledmessages);
router.get("/show-posted-post", auth, getPostedPosts);
router.post("/schedule-post", auth, Schedulepostroute);
router.get("/get-post-telegram-bot", auth, gettelegrambotpost);
router.get("/get-post-dashboard", auth, getdashboardpost);
router.post("/manual-post", async (req, res) => {
  try {
    const { content } = req.body;
    const id = req.userId;
    // Validation check for required fields
    if (!content) {
      return res.status(400).json({
        message: "Content field is required",
        success: false,
      });
    }

    // Fetch user from the database
    const user = await User.findOne({ _id: id });
    // const user = await User.findOne({ email: "vandanrangani21@gmail.com" });

    if (!user || !user.socialAccounts?.twitter?.accessToken) {
      return res.status(404).json({
        message: "Twitter account not linked or user not found",
        success: false,
      });
    }

    // Initialize Twitter client with user's token
    const client = new Client(user.socialAccounts.twitter.accessToken);

    // Post the tweet
    const tweet = await client.tweets.createTweet({ text: content });

    // Respond with success if the tweet is successfully posted
    res.status(200).json({
      message: "Tweet posted successfully",
      tweet: tweet.data.text,
      success: true,
    });

    console.log(`Tweeted: ${tweet.data.text}`);
  } catch (error) {
    console.error("Error posting tweet:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
});

cron.schedule("*/1 * * * *", async () => {
  try {
    const now = moment();
    console.log("Cron job started at:", now.format("YYYY-MM-DD HH:mm"));

    const queryTime = now.format("YYYY-MM-DD HH:mm");
    console.log("Query to find posts:", {
      scheduledTime: { $eq: queryTime },
      status: "pending",
    });

    // Fetch scheduled posts that are due to be posted
    const posts = await ScheduledPost.find({
      scheduledTime: { $eq: queryTime },
      status: "pending",
    });

    console.log("Found posts:", posts.length);

    if (posts.length > 0) {
      for (let post of posts) {
        console.log(`Processing post for user: ${post.userId}`);

        // Fetch user from the database
        const user = await User.findOne({ email: process.env.CALLBACK_MAIL });

        if (!user || !user.socialAccounts?.twitter?.accessToken) {
          console.error(
            `User ${post.userId} does not have valid Twitter tokens.`
          );
          continue;
        }

        // Initialize Twitter client with user's token
        const client = new Client(user.socialAccounts.twitter.accessToken);
        console.log(user.socialAccounts.twitter.accessToken);
        try {
          // Post the tweet
          const tweet = await client.tweets.createTweet({ text: post.content });
          console.log(`Tweeted: ${tweet.data.text}`);

          // Update the post status to "posted", add postId, and save it
          post.status = "posted";
          post.postId = tweet.data.id; // Save the postId returned by Twitter
          await post.save();

          // Example of how you would use the sendPostSuccessEmail function
          await sendPostSuccessEmail(
            user.email,
            user.email,
            post.content,
            post.scheduledTime
          );

          console.log(
            `Post updated: ${post._id} - Status set to "posted", Post ID: ${tweet.data.id}`
          );
        } catch (tweetError) {
          console.error(
            `Error tweeting the post for user ${post.userId}:`,
            tweetError
          );
        }
      }
    } else {
      console.log("No posts to process at this time.");
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});

module.exports = router;
