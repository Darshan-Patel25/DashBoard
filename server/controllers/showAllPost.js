const schedulePost = require("../models/schedulePost");
const user = require("../models/user");

exports.scheduledmessages = async (req, res) => {
  try {
    const id = req.userId; // Extracted userId from the request

    // Fetch user and populate the 'chatId' field (assuming it's referenced)
    const u = await user.findOne({ _id: id }).populate("scheduledPosts").exec();

    if (!u) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }


    // Fetch scheduled posts using populated chatId
    // const posts = await schedulePost.find({ chatId: u.chatId._id });

    return res.status(200).json({
      success: true,
      posts: u.scheduledPosts,
    });
  } catch (error) {
    console.error("Error fetching scheduled messages:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
