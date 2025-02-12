const ScheduledPost = require("../models/schedulePost");
const User = require("../models/user");
exports.getPostedPosts = async (req, res) => {
  try {
    const userId = req.userId;
    // Fetch all posts with status "posted" for the user
    const user = await User.findOne({ _id: req.userId });
    console.log("user", user);
    // Handle the case when the user is not found
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    // Find posts based on the user's associated chatId
    const posts = await ScheduledPost.find({
      userId: userId,
      status: "posted",
    });

    res.status(200).json({
      message: "All posted posts retrieved successfully.",
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching posted posts:", error);
    res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};
