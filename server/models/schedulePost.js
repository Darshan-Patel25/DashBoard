const mongoose = require("mongoose");

const scheduledPostSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // reference to the User model
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  scheduledTime: {
    type: String, // String format to store time without seconds
    required: true,
  },
  platform: {
    type: String,
    enum: ["twitter", "facebook", "instagram"],
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "posted"],
    required: true,
    default: "pending",
  },
  source: {
    type: String,
    enum: ["dashboard", "telegram_bot"],
    required: true,
    default: "dashboard",
  },
  postId: {
    type: String, // Stores the unique identifier of the post after it's posted
    default: null, // Will remain null until the post is posted
  },
});

module.exports = mongoose.model("ScheduledPost", scheduledPostSchema);
