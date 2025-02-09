const moment = require("moment");
const Reminder = require("../models/remainderSchema");

exports.postreaminder = async (req, res) => {
  let { email, postTitle, reminderTime } = req.body;

  try {
    // Format the reminder time
    reminderTime = moment(reminderTime, "YYYY-MM-DD HH:mm").format(
      "YYYY-MM-DD HH:mm"
    );

    if (!moment(reminderTime, "YYYY-MM-DD HH:mm", true).isValid()) {
      return res
        .status(400)
        .json({ error: "Invalid reminder time format. Use YYYY-MM-DD HH:mm." });
    }

    const reminder = new Reminder({ email, postTitle, reminderTime });
    await reminder.save();
    res.status(200).json({ message: "Reminder scheduled successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
