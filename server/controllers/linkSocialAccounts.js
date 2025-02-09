// const express = require("express");
// const { Client, auth } = require("twitter-api-sdk");
// const mongoose = require("mongoose");
// const User = require("./models/User"); // Assuming you have a User model defined
// const app = express();

// const router = express.Router();
// const authClient = new auth.OAuth2User({
//   client_id: "your_twitter_client_id",
//   client_secret: "your_twitter_client_secret",
//   callback: "http://localhost:3000/callback", // Update with your actual callback URL
//   scopes: ["tweet.read", "tweet.write", "users.read", "offline.access"],
// });

// const client = new Client(authClient);
// const STATE = "my-state";

// // Callback route after Twitter auth
// app.get("/callback", async function (req, res) {
//   try {
//     const { code, state } = req.query;

//     // Check the state parameter to prevent CSRF attacks
//     if (state !== STATE) {
//       return res.status(500).send("State isn't matching");
//     }

//     // Request access token using the code received from Twitter
//     const token = await authClient.requestAccessToken(code);
//     if (!token) {
//       return res.status(401).send("Access token missing or expired.");
//     }

//     // Find user by userId (you should store userId in state or session)
//     const userId = "user_id_from_state"; // Replace with actual user ID from state or session
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).send("User not found");
//     }

//     // Save the tokens (access and refresh) to the user's social accounts
//     user.socialAccounts.twitter.accessToken = token.token.access_token;
//     user.socialAccounts.twitter.refreshToken = token.token.refresh_token;

//     // Save the user with updated tokens
//     await user.save();

//     // Optional: Post a tweet to confirm the linking (you can remove this if not needed)
//     const tweetText = "Hello, world! 🚀 #MyFirstTweet";
//     const response = await client.tweets.createTweet({
//       text: tweetText,
//     });

//     console.log("Tweet posted successfully:", response);

//     // Respond with success message
//     res.json({
//       success: true,
//       tweet_id: response.data.id,
//       message: "Twitter account linked successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

// // Login route - User redirects here to authenticate with Twitter
// app.get("/login", async function (req, res) {
//   const authUrl = authClient.generateAuthURL({
//     state: STATE,
//     code_challenge_method: "s256",
//   });
//   res.redirect(authUrl);
// });

// // Revoke access token route (if needed)
// app.get("/revoke", async function (req, res) {
//   try {
//     const response = await authClient.revokeAccessToken();
//     res.send(response);
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to revoke access token" });
//   }
// });
