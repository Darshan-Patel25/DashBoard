const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { auth } = require("../middlewares/auth");
const { fetchComments } = require("../controllers/sentimentcomments");
const { tweetCorrection } = require("../controllers/tweetCorrection");
const { fetchHashtags } = require("../controllers/hastagController");
const { fetchSocialStats } = require("../controllers/socailStas");
const {
  postreaminder,
  getremainders,
} = require("../controllers/postremainder");
const cron = require("node-cron");
const moment = require("moment");
const transporter = require("../config/mailer");
const Reminder = require("../models/remainderSchema");
const { rotateRadians } = require("pdf-lib");
router.post("/sentiment-comments", fetchComments);
router.post("/correct", tweetCorrection);
router.get("/trending-hashtags", fetchHashtags);
router.get("/stas", fetchSocialStats);
router.post("/remainder", auth, postreaminder);
router.get("/getremainder", auth, getremainders);

router.post("/competitor-analysis", async (req, res) => {
  const { competitorAnalysis } = req.body;
  const email = "rajukani100@gmail.com"; // Static for demo; update based on your needs

  if (!email || !Array.isArray(competitorAnalysis)) {
    return res.status(400).json({ message: "Invalid request" });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.competitorAnalysis = competitorAnalysis;
    await user.save();

    res
      .status(200)
      .json({ message: "Competitor companies updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

async function sendReminderEmail(reminderTime, email, postTitle) {
  const mailOptions = {
    from: "vandanrangani21@gmail.com",
    to: email,
    subject: "Post Reminder",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Post Reminder</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            text-align: center;
            border-radius: 5px;
          }
          .content {
            margin-top: 20px;
          }
          .content p {
            font-size: 16px;
            line-height: 1.6;
          }
          .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #888;
          }
          .footer a {
            color: #4CAF50;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Reminder: Your Post</h2>
          </div>
          <div class="content">
            <p>Hi ${email},</p>
            <p>This is a reminder for your post titled: <strong>${postTitle}</strong></p>
            <p>The reminder is scheduled for: <strong>${reminderTime}</strong></p>
            <p>Make sure to review your post and take action accordingly.</p>
            <p>If you no longer wish to receive reminders, please <a href="{{unsubscribeLink}}">unsubscribe here</a>.</p>
          </div>
          <div class="footer">
            <p>Thank you for using our service!</p>
            <p>If you have any questions, feel free to reach out to us at <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Reminder email sent to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Schedule Cron Job to Check Reminders
cron.schedule("* * * * *", async () => {
  try {
    const currentTime = moment().format("YYYY-MM-DD HH:mm");
    console.log("Current time:", currentTime);

    const reminders = await Reminder.find({
      reminderTime: currentTime,
    });

    console.log("Reminders found:", reminders);

    if (reminders.length > 0) {
      await Promise.all(
        reminders.map(async (reminder) => {
          await sendReminderEmail(
            reminder.reminderTime,
            reminder.email,
            reminder.postTitle
          );
          await Reminder.deleteOne({ _id: reminder._id });
        })
      );
    }
  } catch (error) {
    console.error("Error processing reminders:", error);
  }
});

module.exports = router;
