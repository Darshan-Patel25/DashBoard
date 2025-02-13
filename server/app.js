const { chromium } = require("playwright");
const axios = require("axios");
const fs = require("fs");

const SESSION_FILE = "session.json";

(async () => {
  const start = performance.now();
  const browser = await chromium.launch({
    headless: false, args: [
      '--window-position=2000,100'
    ]
  }); // Run in headless mode for better performance
  let context;

  if (fs.existsSync(SESSION_FILE)) {
    console.log("Session found. Reusing existing session...");
    context = await browser.newContext({ storageState: SESSION_FILE });
  } else {
    console.log("No session found. Logging in...");
    context = await browser.newContext();
    const page = await context.newPage();

    try {
      await page.goto("https://x.com/i/flow/login", { timeout: 60000 });
      await page.fill('input[name="text"]', "coder.paycheck944@passinbox.com");
      await page.click("text=Next");

      await page.waitForSelector('input[name="password"]', { timeout: 15000 });
      await page.fill('input[name="password"]', "Hacker123");
      await page.click("text=Log in");

      await page.waitForURL("https://x.com/home", { timeout: 60000 });
      console.log("Login Successful! Saving session...");
      await context.storageState({ path: SESSION_FILE });
    } catch (error) {
      console.error("Error during login:", error);
      await browser.close();
      return;
    }
  }

  const page = await context.newPage();
  const tweetURL = "https://x.com/narendramodi/status/1888848682445128190";

  try {
    await page.goto(tweetURL, { timeout: 60000 });
    await page.waitForSelector('article[data-testid="tweet"]');

    // Extract main tweet text
    const postText = await page.evaluate(() => {
      const tweetElement = document.querySelector(
        'article[data-testid="tweet"]'
      );
      return (
        tweetElement?.querySelector('div[data-testid="tweetText"]')
          ?.innerText || "N/A"
      );
    });

    // Extract engagement metrics
    const engagementMetrics = await page.evaluate(() => {
      const tweetElement = document.querySelector(
        'article[data-testid="tweet"]'
      );
      if (!tweetElement) return {};

      const getMetric = (testId) => {
        const element = tweetElement.querySelector(
          `[data-testid="${testId}"] span`
        );
        return element?.innerText || "0";
      };

      const element = tweetElement.querySelector(
        `[data-testid="app-text-transition-container"] span span`
      );
      const view = element?.innerText || "0";

      return {
        likes: getMetric("like"),
        reply: getMetric("reply"),
        views: view,
        reposts: getMetric("retweet"),
        bookmarks: getMetric("bookmark"),
      };
    });

    // Extract comments with scrolling
    let comments = new Set();
    let previousCount = 0;
    const maxRetries = 10;

    for (let i = 0; i < maxRetries; i++) {
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await page.waitForTimeout(2000);

      const newComments = await page.evaluate(() => {
        return Array.from(
          document.querySelectorAll(
            'article[data-testid="tweet"] div[data-testid="tweetText"]'
          )
        )
          .map((comment) => comment.innerText.trim())
          .filter((text) => text.length > 0);
      });

      newComments.forEach((comment) => comments.add(comment));

      if (comments.size === previousCount) {
        // console.log("No more new comments. Stopping...");
        break;
      }

      previousCount = comments.size;
    }

    const topComments = Array.from(comments).slice(0, 20);
    const formattedComments = topComments
      .map((c, i) => `${i + 1}) ${c}`)
      .join(" ");
    const combinedText = `PostText: ${postText} Comments: ${formattedComments}`;

    // console.log("\nCombined Text for AI Sentiment Analysis:");
    // console.log(combinedText);

    const end = performance.now();
    // console.log(`Execution Time: ${(end - start) / 1000} seconds`);
    // console.log(`Total Comments Extracted: ${topComments.length}`);

    // Send text to Gemini API for sentiment analysis
    let sentimentCategory = "neutral";
    let sentimentAnalysis = "";
    try {
      const geminiResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAQ8xfXFjCOkkG35pZd0QC5TtVd7V9aWnA`,
        {
          contents: [
            {
              parts: [
                {
                  text:
                    combinedText +
                    " Analyze the sentiment of these comments and return overview of comments motive in max 3 lines. Also mention how is tweet in short. [positive, negative, neutral] ",
                },
              ],
            },
          ],
        }
      );

      sentimentAnalysis =
        geminiResponse.data?.candidates?.[0]?.content?.parts[0]?.text?.toLowerCase();

      function extractSentiment(text) {
        const lowerText = text.toLowerCase();
        if (lowerText.includes("positive")) return "positive";
        if (lowerText.includes("negative")) return "negative";
        return "neutral";
      }

      sentimentCategory = extractSentiment(sentimentAnalysis);
    } catch (error) {
      console.error("Error with sentiment analysis API:", error);
    }

    console.log({
      sentimentCategory: sentimentCategory,
      sentimentAnalysis: sentimentAnalysis,
      engagementMetrics,
    });
  } catch (error) {
    console.error("Error during tweet scraping:", error);
  } finally {
    await browser.close();
  }
})();
