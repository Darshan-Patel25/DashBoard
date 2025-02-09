const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    postTitle: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
    },
    reminderTime: {
      type: Date,
      required: [true, "Reminder time is required"],
      validate: {
        validator: function (value) {
          return value > new Date();
        },
        message: "Reminder time must be in the future",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reminder", reminderSchema);
