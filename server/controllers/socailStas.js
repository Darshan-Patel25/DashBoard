const { chromium } = require("playwright");

exports.fetchSocialStats = async (req, res) => {
  const username = req.query.username || "rajukani100"; // Default user if none provided
  const url = `https://socialblade.com/twitter/user/${username}`;

  const browser = await chromium.launch({
    headless: false, args: [
      '--window-position=2000,100'
    ]
  });
  const context = await browser.newContext();

  await context.route("**/*", (route, request) => {
    if (
      request.resourceType() === "image" ||
      request.resourceType() === "stylesheet" ||
      request.resourceType() === "font" ||
      request.resourceType() === "media" ||
      request.url().includes("analytics") ||
      request.url().includes("track")
    ) {
      route.abort();
    } else {
      route.continue();
    }
  });

  const page = await context.newPage();

  try {
    console.log(`Navigating to: ${url}`);
    await page.goto(url, { waitUntil: "domcontentloaded" });

    await page.waitForSelector("#YouTubeUserTopInfoBlock");

    const stats = await page.evaluate(() => {
      const statsData = {};
      document.querySelectorAll(".YouTubeUserTopInfo").forEach((el) => {
        let key = el.querySelector(".YouTubeUserTopLight")?.innerText.trim();
        const value = el.querySelector("span:nth-of-type(2)")?.innerText.trim();
        if (key && value) {
          if (key === "User Created") {
            key = "UserCreated";
          }
          statsData[key] = value;
        }
      });

      const mainRow = document.querySelector(
        "#socialblade-user-content > div:nth-child(11)"
      ).children;

      let lists = [];
      for (let i = 0; i <= mainRow.length - 2; i++) {
        const data = {};
        data["date"] = mainRow[i].children[0].children[0]?.innerText;
        data["day"] = mainRow[i].children[0].children[1]?.innerText;

        data["followers"] = mainRow[i].children[1].children[1]?.innerText;
        const followersGrowth = mainRow[i].children[1].children[0]?.innerText;
        data["followersGrowth"] =
          followersGrowth === "--" ? "0" : followersGrowth;

        data["followings"] = mainRow[i].children[2].children[1]?.innerText;
        const followingsGrowth = mainRow[i].children[2].children[0]?.innerText;
        data["followingsGrowth"] =
          followingsGrowth === "--" ? "0" : followingsGrowth;

        data["tweets"] = mainRow[i].children[3].children[1]?.innerText;
        const tweetsGrowth = mainRow[i].children[3].children[0]?.innerText;
        data["tweetsGrowth"] = tweetsGrowth === "--" ? "0" : tweetsGrowth;
        lists.push(data);
      }

      const averageStat = {};
      const average = document.querySelector(
        "#socialblade-user-content > div:nth-child(12)"
      ).children;

      let followers = average[1].children[0]?.textContent;
      let following = average[2].children[0]?.textContent;
      let tweets = average[3].children[0]?.textContent;

      averageStat["followers"] = followers === "--" ? "0" : followers;
      averageStat["followings"] = following === "--" ? "0" : following;
      averageStat["tweets"] = tweets === "--" ? "0" : tweets;

      const last30dayStat = {};
      const last30days = document.querySelector(
        "#socialblade-user-content div:nth-child(13)"
      ).children;

      followers = last30days[1]?.children[0]?.innerText;
      following = last30days[2]?.children[0]?.innerText;
      tweets = last30days[3]?.children[0]?.innerText;

      last30dayStat["followers"] = followers === "--" ? "0" : followers;
      last30dayStat["followings"] = following === "--" ? "0" : following;
      last30dayStat["tweets"] = tweets === "--" ? "0" : tweets;

      statsData["Average"] = averageStat;
      statsData["Last30days"] = last30dayStat;
      statsData["Graph"] = lists;
      return statsData;
    });

    res.json(stats);
  } catch (error) {
    console.error("Error fetching social stats:", error.message);
    res.status(500).json({ error: "Failed to fetch social stats." });
  } finally {
    await context.close();
    await browser.close();
  }
};
