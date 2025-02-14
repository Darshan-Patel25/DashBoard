const express = require("express");
const axios = require("axios");
const playwright = require("playwright");
exports.shownearcomp = async (req, res) => {
  try {
    const { location, category } = req.body;
    if (!location || !category) {
      return res
        .status(400)
        .json({ error: "Location and category are required" });
    }

    const browser = await playwright.chromium.launch({
      headless: false,
      args: ["--window-position=2000,100"],
    });
    const context = await browser.newContext({
      extraHTTPHeaders: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.justdial.com/",
        "Upgrade-Insecure-Requests": "1",
      },
    });

    const page = await context.newPage();
    await page.goto(
      `https://www.justdial.com/${location}/search?q=${category}`,
      { waitUntil: "domcontentloaded" }
    );

    await page.waitForSelector("#mainContent", { timeout: 10000 });

    const data = await page.evaluate(() => {
      const resultBox = document.querySelectorAll(
        ".resultbox_info > div:nth-child(2)"
      );
      const fullData = [];

      resultBox.forEach((element) => {
        const data = {};
        const name = element.querySelector(
          ".resultbox_title_anchor"
        )?.textContent;
        const address = element.querySelector(".locatcity")?.textContent;
        data["name"] = name;
        data["address"] = address;

        fullData.push(data);
      });

      return fullData;
    });

    await browser.close();

    res.json({ competitors: data, success: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
