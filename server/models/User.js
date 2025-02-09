const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    telegramId: {
      type: String,
      default: null,
    },
    socialAccounts: {
      twitter: {
        handle: {
          type: String,
          default: null,
        },
        accessToken: {
          type: String,
          default: null,
        },
        refreshToken: {
          type: String,
          default: null,
        },
      },
      facebook: {
        pageName: {
          type: String,
          default: null,
        },
        accessToken: {
          type: String,
          default: null,
        },
      },
      instagram: {
        usernames: {
          type: String,
          default: null,
        },
        accessToken: {
          type: String,
          default: null,
        },
      },
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    analytics: {
      totalPosts: {
        type: Number,
        default: 0,
      },
      totalFollowers: {
        type: Number,
        default: 0,
      },
      totalEngagement: {
        type: Number,
        default: 0,
      },
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    scheduledPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ScheduledPost",
      },
    ],
    competitorAnalysis: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("User", userSchema);
