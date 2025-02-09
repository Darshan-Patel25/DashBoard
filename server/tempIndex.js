const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const userrouter = require("./routes/user.routes");
const { Client, auth } = require("twitter-api-sdk");
const jwt = require("jsonwebtoken");
const User = require("./models/user");

// Middleware setup
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
    helmet({
        crossOriginResoursePolicy: false,
    })
);

// Twitter OAuth Client setup
const authClient = new auth.OAuth2User({
    client_id: "",
    client_secret: "",
    callback: "",
    scopes: ["tweet.read", "tweet.write", "users.read", "offline.access"],
});

const client = new Client(authClient);
const STATE = "my-state";

// Callback route for Twitter OAuth
app.get("/callback", async function (req, res) {
    try {
        const { code, state } = req.query;

        // Validate the state parameter
        if (state !== STATE) {
            return res.status(400).send("State mismatch");
        }

        // Request the access token from Twitter using the authorization code
        const token = await authClient.requestAccessToken(code);
        console.log("access token: " + token.token.access_token)
        console.log("\nrefreshToken: " + token.token.refresh_token)
        if (!token) {
            return res.status(401).send("Access token missing or expired.");
        }

        // If you want to identify the user by their email (JWT could be used here)
        let email = "vandanrangani21@gmail.com"; // Get from JWT or session cookie
        if (!email) {
            return res.status(400).send("User not found in session");
        }

        // Step 1: Find the user by email (you may modify this with JWT authentication if needed)
        // const user = await User.findOne({ email });
        // if (!user) {
        //   return res.status(404).send("User not found");
        // }

        // Step 2: Save the Twitter tokens to the user's social account
        // user.socialAccounts.twitter.accessToken = token.token.access_token;
        // user.socialAccounts.twitter.refreshToken = token.token.refresh_token;
        // await user.save(); // Save the user with updated Twitter account info

        // Respond with success
        res.json({
            success: true,
            message: "Twitter account linked successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// Route to start the Twitter login process
app.get("/link-twitter", async function (req, res) {
    const authUrl = authClient.generateAuthURL({
        state: STATE,
        code_challenge_method: "s256",
    });
    res.redirect(authUrl); // Redirect the user to Twitter's authorization page
});

// Route to revoke the access token (for logging out)
app.get("/revoke", async function (req, res) {
    try {
        const response = await authClient.revokeAccessToken();
        res.send(response); // Send response to the client after revoking
    } catch (error) {
        console.error("Error revoking token:", error);
        res.status(500).send("Error revoking token.");
    }
});

// Basic route for checking server status
app.get("/", (req, res) => {
    res.send("Server is up and running!");
});

// User-related routes (assuming you have routes defined in `user.routes.js`)
app.use("/api/user", userrouter);

// Start the server after connecting to the database
// connectDB().then(() => {
//   app.listen(process.env.PORT || 8080, () => {
//     console.log(`Server is running on port ${process.env.PORT || 8080}`);
//   });
// });

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT || 8080}`);
});