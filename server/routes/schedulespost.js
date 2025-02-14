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
const fs = require("fs");
const path = require("path");
const { TwitterApi } = require("twitter-api-v2");

router.get("/showallpost", auth, scheduledmessages);
router.get("/show-posted-post", auth, getPostedPosts);
router.post("/schedule-post", auth, Schedulepostroute);
router.get("/get-post-telegram-bot", auth, gettelegrambotpost);
router.get("/get-post-dashboard", auth, getdashboardpost);

//manual post for image

async function postTweetWithRootImage(contents, rwClient, imagePath) {
  try {
    const content = contents;

    // Check if image exists
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file not found: ${imagePath}`);
    }

    // Read the image from the root directory
    const imageBuffer = fs.readFileSync(imagePath);

    // Upload media using v1 (only method available)
    const mediaId = await rwClient.v1.uploadMedia(imageBuffer, {
      mimeType: "image/jpeg",
    });

    // Post tweet with uploaded media
    const tweet = await rwClient.v2.tweet({
      text: content,
      media: { media_ids: [mediaId] },
    });

    console.log("Tweet posted successfully:", tweet.data.text);
  } catch (error) {
    console.error("Error posting tweet:", error);
  }
}

router.post("/manual-post", async (req, res) => {
  const { content, imagepath } = req.body;
  console.log(req.body);
  const apiKey = "LfnZfITfPmJuq7vgD3g0bL8UG";
  const apiSecret = "WLIFEBDdd8pbMe8yKt2sMJqyrCVneXEmXNuRbRSY64TPTfibdL";
  const accessToken = "1885580449013248000-Hcj95TVkJvcxDwcPa0xyI9Pc9LA69F";
  const accessSecret = "L2qIyxtml7itgJ9hFiaf9MAWPxj0ykESEAWo0e3Nag8QF";
  if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
    console.error(
      "Error: Missing Twitter API credentials in environment variables."
    );
    process.exit(1);
  }
  const client = new TwitterApi({
    appKey: apiKey,
    appSecret: apiSecret,
    accessToken: accessToken,
    accessSecret: accessSecret,
  });
  const rwClient = client.readWrite;
  const imagePath = path.join(__dirname, "image.jpg");
  // postTweetWithRootImage(content, rwClient, imagePath);
  res.status(200).json({
    message: "sucess",
  });
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
