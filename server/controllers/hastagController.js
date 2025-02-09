const { chromium } = require("playwright");

// Function to scrape hashtags using Playwright
async function getTrendingHashtagsFromScraping() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  await context.route("**/*", (route, request) => {
    if (
      request.resourceType() === "image" ||
      request.resourceType() === "stylesheet" ||
      request.resourceType() === "font" ||
      request.resourceType() === "media" ||
      request.url().includes("analytics") ||
      request.url().includes("track") ||
      request.url().includes("prebid") ||
      request.url().includes("ads")
    ) {
      route.abort();
    } else {
      route.continue();
    }
  });

  const page = await context.newPage();
  const url = "https://trends24.in/india/";

  console.log("Navigating to:", url);
  await page.goto(url, { waitUntil: "domcontentloaded" });

  await page.waitForSelector(".list-container");

  const result = await page.evaluate(() => {
    const hashtags = [];
    const data = document.querySelector(
      ".list-container > .trend-card__list"
    ).children;
    for (let i = 0; i < data.length; i++) {
      const hashtag = data[i].querySelector("span > a").textContent;
      hashtags.push(hashtag);
    }
    return hashtags;
  });

  await context.close();
  await browser.close();
  return result;
}

// Exported function to get hashtags from scraping
exports.fetchHashtags = async (req, res) => {
  try {
    console.log("Fetching hashtags by scraping...");
    const scrapedHashtags = await getTrendingHashtagsFromScraping();
    console.log("Scraped Hashtags:", scrapedHashtags);
    res.json({ hashtags: scrapedHashtags });
  } catch (error) {
    console.error("Error fetching hashtags:", error);
    res.status(500).json({ error: "Failed to fetch hashtags." });
  }
};
