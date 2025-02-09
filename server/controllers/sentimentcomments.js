const { chromium } = require("playwright");
const axios = require("axios");
require("dotenv").config();
const fs = require("fs");

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const SESSION_FILE = "session.json";

exports.fetchComments = async (req, res) => {
  const start = performance.now();
  const browser = await chromium.launch({ headless: false });
  let context;

  // Check for existing session
  if (fs.existsSync(SESSION_FILE)) {
    console.log("Session found. Reusing existing session...");
    context = await browser.newContext({ storageState: SESSION_FILE });
  } else {
    console.log("No session found. Logging in...");
    context = await browser.newContext();
    const page = await context.newPage();

    try {
      await page.goto("https://x.com/i/flow/login");
      await page.fill('input[name="text"]', "coder.paycheck944@passinbox.com");
      await page.click("text=Next");

      await page.waitForSelector('input[name="password"]');
      await page.fill('input[name="password"]', "Hacker123");
      await page.click("text=Log in");

      await page.waitForURL("https://x.com/home");
      console.log("Login Successful! Saving session...");
      await context.storageState({ path: SESSION_FILE });
    } catch (error) {
      console.error("Error during login:", error);
      await browser.close();
      return res.status(500).json({ error: "Login failed" });
    }
  }

  const page = await context.newPage();
  const tweetURL = "https://x.com/narendramodi/status/1886021508264521728";

  try {
    await page.goto(tweetURL);
    await page.waitForSelector('article[data-testid="tweet"]');

    // Extract tweet text
    const postText = await page.evaluate(() => {
      const tweetElement = document.querySelector('article[data-testid="tweet"]');
      if (!tweetElement) return "N/A";
      return tweetElement.querySelector('div[data-testid="tweetText"]')?.innerText || "N/A";
    });

    // Extract engagement metrics
    const engagementMetrics = await page.evaluate(() => {
      const tweetElement = document.querySelector('article[data-testid="tweet"]');
      if (!tweetElement) return {};

      const metrics = {};
      const engagementElements = tweetElement.querySelectorAll(
        '[data-testid="reply"], [data-testid="retweet"], [data-testid="like"], [data-testid="bookmark"]'
      );

      engagementElements.forEach((element) => {
        const metricType = element.getAttribute('data-testid');
        const metricValue = element.querySelector('span')?.innerText || "0";
        metrics[metricType] = metricValue;
      });

      return metrics;
    });

    // Extract comments
    let comments = [];
    let previousCommentCount = 0;
    let maxRetries = 10;

    while (comments.length < 20 && maxRetries > 0) {
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await page.waitForTimeout(1000);

      const newComments = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('article[data-testid="tweet"]'))
          .map((comment) => comment.querySelector('div[data-testid="tweetText"]')?.innerText)
          .filter((text) => text);
      });

      // Remove duplicates and trim spaces
      comments = [...new Set([...comments, ...newComments])].map((comment) => comment.trim());

      if (comments.length === previousCommentCount) {
        console.log("No more comments loaded. Exiting...");
        break;
      }

      previousCommentCount = comments.length;
      maxRetries--;
    }

    comments = comments.slice(0, 20);

    // Format comments
    const formattedComments = comments
      .map((comment, index) => `${index + 1}) ${comment.trim()}`)
      .join(" ");

    let combinedText = `PostText: ${postText} Comments: ${formattedComments}`;

    console.log("\nCombined Text for AI Sentiment Analysis:");
    console.log(combinedText);

    const end = performance.now();
    console.log(`Execution Time: ${(end - start) / 1000} seconds`);
    console.log(`Total Comments Extracted: ${comments.length}`);

    // Send combined text to Gemini API for sentiment analysis
    const geminiResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text:
                  combinedText +
                  " analyze the sentiment of these comments and return positive, negative, or neutral sentiment insights in para and give me average of all comments. Give me only positive, negative, or neutral in response, no extra explanation.",
              },
            ],
          },
        ],
      }
    );

    const sentimentAnalysis = geminiResponse.data?.candidates?.[0]?.content?.parts[0]?.text;

    res.json({
      sentimentAnalysis: sentimentAnalysis || "No sentiment analysis available",
      engagementMetrics: engagementMetrics || {},
    });
  } catch (error) {
    console.error("Error during tweet scraping:", error);
    res.status(500).json({ error: "Failed to fetch tweet data" });
  } finally {
    await browser.close();
  }

};
