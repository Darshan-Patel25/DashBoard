const express = require("express");
const fs = require("fs");
const ExcelJS = require("exceljs");
const { chromium } = require("playwright");
const { exec } = require("child_process");
const { promisify } = require("util");

const app = express();
const router = express.Router();

// Promisify exec to handle async/await with exec
const execPromise = promisify(exec);

// Function to fetch social stats
exports.fetchSocialStats = async (username) => {
  const url = `https://socialblade.com/twitter/user/${username}`;
  const browser = await chromium.launch({
    headless: false, args: [
      '--window-position=2000,100'
    ]
  });
  const context = await browser.newContext();

  await context.route("**/*", (route, request) => {
    if (
      ["image", "stylesheet", "font", "media"].includes(
        request.resourceType()
      ) ||
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

      averageStat["followers"] = average[1].children[0]?.textContent || "0";
      averageStat["followings"] = average[2].children[0]?.textContent || "0";
      averageStat["tweets"] = average[3].children[0]?.textContent || "0";

      const last30dayStat = {};
      const last30days = document.querySelector(
        "#socialblade-user-content div:nth-child(13)"
      ).children;

      last30dayStat["followers"] = last30days[1]?.children[0]?.innerText || "0";
      last30dayStat["followings"] =
        last30days[2]?.children[0]?.innerText || "0";
      last30dayStat["tweets"] = last30days[3]?.children[0]?.innerText || "0";

      statsData["Average"] = averageStat;
      statsData["Last30days"] = last30dayStat;
      statsData["Graph"] = lists;
      return statsData;
    });

    await context.close();
    await browser.close();
    return stats;
  } catch (error) {
    console.error("Error fetching social stats:", error.message);
    await context.close();
    await browser.close();
    throw error;
  }
};

// Generate Excel File Route
// router.get("/generate-excel", async (req, res) => {
//   const username = req.query.username || "rajukani100";

//   try {
//     // Fetch social stats data
//     const jsonData = await fetchSocialStats(username);
//     if (!jsonData || !jsonData.Graph) {
//       return res
//         .status(400)
//         .json({ error: "Invalid data received from SocialBlade" });
//     }

//     // Create Excel workbook and worksheet
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet("Social Media Data");

//     worksheet.columns = [
//       { header: "Date", key: "date", width: 15 },
//       { header: "Followers", key: "followers", width: 15 },
//       { header: "Followers Growth", key: "followersGrowth", width: 20 },
//       { header: "Followings", key: "followings", width: 15 },
//       { header: "Followings Growth", key: "followingsGrowth", width: 20 },
//       { header: "Tweets", key: "tweets", width: 15 },
//       { header: "Tweets Growth", key: "tweetsGrowth", width: 20 },
//     ];

//     // Add data rows to the Excel file
//     jsonData.Graph.forEach((data) => worksheet.addRow(data));
//     const filePath = "SocialMediaData.xlsx";

//     // Write the workbook to a file
//     await workbook.xlsx.writeFile(filePath);

//     // Log that Excel file has been generated
//     console.log("Excel file generated:", filePath);

//     // Execute the Python script to add charts (async)
//     try {
//       await execPromise("python3 add_charts.py");
//       console.log("Charts added successfully");
//     } catch (pythonError) {
//       console.error("Error executing Python script:", pythonError.message);
//       return res.status(500).send("Error generating charts");
//     }

//     // Send the generated file as download response
//     return res.download(filePath, "SocialMediaData.xlsx", (downloadError) => {
//       if (downloadError) {
//         console.error("Error sending the file:", downloadError.message);
//         return res.status(500).send("Error sending the file");
//       }

//       // Optionally, clean up the file after sending it
//       fs.unlink(filePath, (unlinkError) => {
//         if (unlinkError) {
//           console.error("Error deleting the file:", unlinkError.message);
//         } else {
//           console.log("Temporary file deleted:", filePath);
//         }
//       });
//     });
//   } catch (error) {
//     console.error("Error generating Excel file:", error.message);
//     res.status(500).json({ error: "Failed to generate Excel file." });
//   }
// });
