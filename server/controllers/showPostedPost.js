const ScheduledPost = require("../models/schedulePost");

exports.getPostedPosts = async (req, res) => {
  try {
    // Fetch all posts with status "posted" for the user
    const posts = await ScheduledPost.find({
      userId: req.userId,
      status: "posted", // Filter only "posted" status
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
