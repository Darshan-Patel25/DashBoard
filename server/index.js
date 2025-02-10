const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const puppeteer = require("puppeteer");
const telegrambot = require("./controllers/telegramBot");
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
const { Schedulepostroute } = require("./controllers/schedulepost");
const router = require("./routes/schedulespost");
const anaytics = require("./routes/analyticsRoutes");
const generateexcel = require("./controllers/generateExcel");
const usersController = require("./controllers/users.controlers");
const path = require("path");
app.set("view engine", "ejs");
const axios = require("axios");
app.use(express.static(path.join(__dirname, "public")));
app.get("/report", async (req, res) => {
  try {
    // Fetch data from external API
    const response = await axios.get("http://localhost:8080/api/comments/stas");

    // Fetch trending hashtags from the API
    const hashtagsResponse = await fetch(
      "http://localhost:8080/api/comments/trending-hashtags"
    );
    const trendingHashtagsData = await hashtagsResponse.json();

    // Extract the trending hashtags array from the response
    const trendingHashtags = trendingHashtagsData.hashtags; // Access the 'hashtags' property directly

    // Extract Followers, Following, and Tweets from the response
    const { Followers, Following, Tweets } = response.data;
    const { followers, followings, tweets } = response.data.Average;

    // Prepare the analytics data
    const analyticsData = {
      username: "rajukani100",
      platform: "Twitter",
      stats: [Followers, Following, Tweets], // Set the stats array with the fetched values
      hashtags: trendingHashtags.slice(0, 10), // Get the top 10 trending hashtags
      Average: [followers, followings, tweets],
      comments: [
        "Great content, keep it up!",
        "This was very insightful!",
        "Loved your perspective on tech trends!",
      ],
    };

    // Render the report page with the analytics data
    res.render("report", { analyticsData });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

app.get("/generate-pdf", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`http://localhost:8080/report`, {
      waitUntil: "networkidle0",
    });

    const pdfPath = path.join(__dirname, "report.pdf");

    // Generate PDF
    await page.pdf({
      format: "A4",
      printBackground: true,
      path: pdfPath,
    });

    await browser.close();

    // Set CORS headers before sending the file
    res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Read the PDF as a buffer and send it
    res.sendFile(pdfPath, (err) => {
      if (err) {
        console.error("Error sending PDF:", err);
        res.status(500).send("Error sending PDF");
      } else {
        console.log("PDF sent successfully");
      }
    });

  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});
// Middleware setup
app.use(
  cors({
    credentials: true,
    methods: "GET, POST",
    origin: process.env.FRONTEND_URL,
    allowedHeaders: "Content-Type,Authorization",
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
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECREAT,
  callback: process.env.CALLBACK_URL,
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
    if (!token) {
      return res.status(401).send("Access token missing or expired.");
    }

    // If you want to identify the user by their email (JWT could be used here)
    let email = "rajukani100@gmail.com"; // Get from JWT or session cookie
    if (!email) {
      return res.status(400).send("User not found in session");
    }

    // Step 1: Find the user by email (you may modify this with JWT authentication if needed)
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    console.log("token", token.token.access_token);
    // Step 2: Save the Twitter tokens to the user's social account
    user.socialAccounts.twitter.accessToken = token.token.access_token;
    user.socialAccounts.twitter.refreshToken = token.token.refresh_token;
    await user.save(); // Save the user with updated Twitter account info

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
app.use("/api/schedule", router);
app.use("/api/comments", anaytics);

connectDB().then(() => {
  app.listen(process.env.PORT || 8080, () => {
    console.log(`Server is running on port ${process.env.PORT || 8080}`);
  });
});
