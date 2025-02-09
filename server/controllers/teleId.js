const { message } = require("telegraf/filters");
const User = require("../models/user");
exports.teleId = async (req, res) => {
  const { telegramId } = req.body;
  const id = req.userId;
  try {
    if (!telegramId) {
      return res.status(400).json({
        message: "all fields are required",
        success: false,
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        telegramId,
      },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "telegram chat id added succesfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};
