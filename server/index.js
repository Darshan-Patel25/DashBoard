require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const multer = require("multer");
const axios = require("axios");
const { TwitterApi } = require("twitter-api-v2");

// Import Database Connection
const connectDB = require("./config/db");

// Import Routes & Controllers
const userRoutes = require("./routes/user.routes");
const scheduleRoutes = require("./routes/schedulespost");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();
const PORT = process.env.PORT || 8080;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Ensure "uploads" directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Configuration for File Uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, "_")}`),
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  allowedTypes.includes(file.mimetype)
    ? cb(null, true)
    : cb(new Error("Invalid file type. Only JPG, PNG, GIF, and WEBP allowed."));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Middleware Setup
app.use(cors({ credentials: true, origin: FRONTEND_URL }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use("/uploads", express.static(uploadDir)); // Serve uploaded files

// **File Upload API**
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  res.json({
    message: "File uploaded successfully",
    filePath: `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`,
  });
});

// **Error Handling for Multer**
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: `Multer error: ${err.message}` });
  } else if (err) {
    return res.status(400).json({ message: err.message });
  }
  next();
});

// **Basic Server Health Check Route**
app.get("/", (req, res) => res.send("🚀 Server is running!"));

// **API Routes**
app.use("/api/user", userRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/comments", analyticsRoutes);

// **Fetch & Render Report Data**
app.get("/report", async (req, res) => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/api/comments/stats`);
    const trendingHashtagsResponse = await axios.get(
      `${BACKEND_URL}/api/comments/trending-hashtags`
    );

    const analyticsData = {
      username: "rajukani100",
      platform: "Twitter",
      stats: [data.Followers, data.Following, data.Tweets],
      hashtags: trendingHashtagsResponse.data.hashtags.slice(0, 10),
      comments: ["Great content!", "Very insightful!", "Loved this post!"],
    };

    res.render("report", { analyticsData });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({ message: "Failed to fetch data" });
  }
});

// **Generate PDF from Report**
app.get("/generate-pdf", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(`${BACKEND_URL}/report`, { waitUntil: "networkidle0" });

    const pdfPath = path.join(__dirname, "report.pdf");
    await page.pdf({ format: "A4", printBackground: true, path: pdfPath });
    await browser.close();

    res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

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

// **Post Tweet with Image**
async function postTweetWithImage(content, rwClient, imagePath) {
  try {
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file not found: ${imagePath}`);
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const mediaId = await rwClient.v1.uploadMedia(imageBuffer, {
      mimeType: "image/jpeg",
    });

    const tweet = await rwClient.v2.tweet({
      text: content,
      media: { media_ids: [mediaId] },
    });

    console.log("Tweet posted successfully:", tweet.data.text);
  } catch (error) {
    console.error("Error posting tweet:", error);
    throw error;
  }
}

// **Direct Post API (Twitter)**
app.post(
  "/api/schedule/direct-post",
  upload.single("image"),
  async (req, res) => {
    try {
      const { content } = req.body;
      if (!content)
        return res.status(400).json({ message: "Post content is required." });

      const imagePath = req.file
        ? path.join(uploadDir, req.file.filename)
        : null;

      // **Twitter API Credentials**
      const twitterClient = new TwitterApi({
        appKey: "LfnZfITfPmJuq7vgD3g0bL8UG",
        appSecret: "WLIFEBDdd8pbMe8yKt2sMJqyrCVneXEmXNuRbRSY64TPTfibdL",
        accessToken: "1885580449013248000-Hcj95TVkJvcxDwcPa0xyI9Pc9LA69F",
        accessSecret: "L2qIyxtml7itgJ9hFiaf9MAWPxj0ykESEAWo0e3Nag8QF",
      });

      const rwClient = twitterClient.readWrite;

      await postTweetWithImage(content, rwClient, imagePath);

      console.log("New Post:", { content, imagePath });

      res.json({ message: "Post uploaded successfully!", content, imagePath });
    } catch (error) {
      console.error("Error processing direct post:", error);
      res.status(500).json({ message: "Error uploading post." });
    }
  }
);

// **Connect to Database and Start Server**
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
