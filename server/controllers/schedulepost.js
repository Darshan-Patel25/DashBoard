const mongoose = require("mongoose");
const ScheduledPost = require("../models/schedulePost");
const User = require("../models/user"); // Make sure to import the User model
const moment = require("moment");
const sendPostSuccessEmail = require("../mailTemplates/postsuccesmail");

exports.Schedulepostroute = async (req, res) => {
  const { content, scheduledTime } = req.body;
  const id = req.userId;
  console.log("schedule post route");
  console.log(id);
  if (!id || !content || !scheduledTime) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }

  try {
    // Format scheduledTime to "YYYY-MM-DD HH:mm" (without seconds)
    const formattedScheduledTime =
      moment(scheduledTime).format("YYYY-MM-DD HH:mm");

    // Create the new ScheduledPost
    const newScheduledPost = new ScheduledPost({
      userId: id,
      content,
      scheduledTime: formattedScheduledTime,
    });
    await sendPostSuccessEmail(
      "vandanrangani21@gmail.com",
      "user-email@example.com",
      content,
      formattedScheduledTime
    );
    // Save the ScheduledPost
    const savedScheduledPost = await newScheduledPost.save();

    // Find the user and push the scheduled post into the scheduledPosts array
    await User.findByIdAndUpdate(
      id,
      {
        $push: { scheduledPosts: savedScheduledPost._id }, // Push the _id of the saved post
      },
      { new: true } // Return the updated document
    );

    res.json({
      message: "Post scheduled successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.gettelegrambotpost = async (req, res) => {
  try {
    const posts = await ScheduledPost.find({
      userId: req.userId,
      source: "telegram_bot",
    });

    res.status(200).json({
      message: "Posts from Dashboard retrieved successfully.",
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching Dashboard posts:", error);
    res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

exports.getdashboardpost = async (req, res) => {
  try {
    const posts = await ScheduledPost.find({
      userId: req.userId,
      source: "dashboard",
    });

    res.status(200).json({
      message: "Posts from Dashboard retrieved successfully.",
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching Dashboard posts:", error);
    res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};
