const schedulePost = require("../models/schedulePost");

exports.scheduledmessages = async (req, res) => {
  try {
    const id = req.userId; // You have userId in the request after authentication
    console.log(id);

    if (!id) {
      return res.status(400).json({
        message: "User not found",
        success: false, // Fix the typo from "sucess" to "success"
      });
    }

    // Use await to handle the asynchronous operation
    const posts = await schedulePost.find({ userId: id });

    // Return the posts as a response
    return res.status(200).json({
      posts, // Renamed variable to match the response object
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
