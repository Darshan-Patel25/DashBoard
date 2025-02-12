const { Telegraf, Markup } = require("telegraf");
const schedule = require("node-schedule");
const ScheduledPost = require("../models/schedulePost");
const User = require("../models/user");
const moment = require("moment");
const mongoose = require("mongoose");

const bot = new Telegraf("7399056212:AAFYJ-4mGBLxeHzwK2fcQ7Bt2zHwJ9Stx6U");
const userStates = {};

// Start command with a custom menu
bot.start((ctx) => {
  const chatId = ctx.chat.id;
  ctx.reply(
    `Welcome! Your Chat ID is: ${chatId}\nChoose an option:`,
    Markup.inlineKeyboard([
      [Markup.button.callback("🚀 Post Now", "post_now")],
      [Markup.button.callback("⏳ Schedule Post", "schedule_post")],
    ])
  );
  console.log(`User Chat ID: ${chatId}`);
});

bot.action("post_now", (ctx) => {
  ctx.reply("Send me the text to post now.");
  userStates[ctx.chat.id] = "waiting_for_post_now";
});

bot.action("schedule_post", (ctx) => {
  ctx.reply("Send me the text you want to schedule.");
  userStates[ctx.chat.id] = "waiting_for_scheduled_text";
});

bot.on("text", async (ctx) => {
  const userId = ctx.chat.id;
  const userState = userStates[userId];

  if (userState === "waiting_for_post_now") {
    console.log("📌 Instant Post:", ctx.message.text);
    ctx.reply(`✅ Your post: "${ctx.message.text}" has been posted now!`);
    delete userStates[userId];
  } else if (userState === "waiting_for_scheduled_text") {
    userStates[userId] = { step: "waiting_for_time", text: ctx.message.text };
    ctx.reply(
      "✅ Text received. Now send the scheduled time (YYYY-MM-DD HH:mm format)."
    );
  } else if (userState?.step === "waiting_for_time") {
    const timeInput = ctx.message.text;

    if (!moment(timeInput, "YYYY-MM-DD HH:mm", true).isValid()) {
      return ctx.reply(
        "❌ Invalid time format! Use YYYY-MM-DD HH:mm format. Try again."
      );
    }

    const scheduledTime = moment(timeInput, "YYYY-MM-DD HH:mm").format(
      "YYYY-MM-DD HH:mm"
    );
    const now = moment();
    if (moment(scheduledTime, "YYYY-MM-DD HH:mm").isBefore(now)) {
      return ctx.reply(
        "❌ The scheduled time is in the past. Please provide a future time."
      );
    }

    const post = {
      chatId: userId,
      content: userState.text,
      time: scheduledTime,
    };

    const user = await User.findOne({
      chatId: user.telegramId,
    });
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
      email: user.email
    });

    try {
      // Create a scheduled post with source as 'telegram_bot'
      const newPost = new ScheduledPost({
        userId: new mongoose.Types.ObjectId(), // Temporary ObjectId
        chatId: userId, // Store the chat ID here
        content: userState.text,
        scheduledTime: scheduledTime,
        platform: "twitter",
        status: "pending",
        source: "telegram_bot", // Indicates the source
      });

      const savedPost = await newPost.save();

      // Associate the post with the user
      let user = await User.findOne({ telegramId: ctx.chat.id });
      if (!user) {
        // If the user doesn't exist, create a new one
        user = new User({
          telegramId: ctx.chat.id,
          scheduledPosts: [],
        });
      }

      // Add the new scheduled post to the user's array
      user.scheduledPosts.push(savedPost._id);
      await user.save();

      // Schedule the post
      // schedule.scheduleJob(scheduledTime, async () => {
      //   await bot.telegram.sendMessage(
      //     post.chatId,
      //     `📢 Scheduled Post: "${post.content}" at ${post.time}`
      //   );
      //   console.log("🕒 Scheduled Post Sent:", post);
      //   savedPost.status = "posted";
      //   await savedPost.save();
      // });

      ctx.reply(
        `✅ Your post "${post.content}" has been scheduled for ${post.time}.`
      );
    } catch (error) {
      console.error("Error saving post:", error);
      ctx.reply(
        "❌ There was an error scheduling your post. Please try again."
      );
    }

    delete userStates[userId];
  }
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
