const moment = require("moment");
const Reminder = require("../models/remainderSchema");
const User = require("../models/user");
exports.postreaminder = async (req, res) => {
  let { postTitle, reminderTime } = req.body;
  const id = req.userId;
  console.log("iddd", id);

  try {
    const userone = await User.findById(id);
    // Format the reminder time
    reminderTime = moment(reminderTime, "YYYY-MM-DD HH:mm").format(
      "YYYY-MM-DD HH:mm"
    );

    if (!moment(reminderTime, "YYYY-MM-DD HH:mm", true).isValid()) {
      return res
        .status(400)
        .json({ error: "Invalid reminder time format. Use YYYY-MM-DD HH:mm." });
    }

    const reminder = new Reminder({
      email: userone.email,
      postTitle,
      reminderTime,
    });
    await reminder.save();
    console.log("sucess");

    res.status(200).json({ message: "Reminder scheduled successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getremainders = async (req, res) => {
  try {
    const id = req.userId;
    // console.log("remainder");
    // Ensure the user is fetched correctly
    const userone = await User.findById(id); // Correct capitalization
    if (!userone) {
      return res.status(404).json({ error: "User not found" });
    }

    // Fetch all reminders for this user based on their email
    const reminders = await Reminder.find({ email: userone.email });

    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
};
