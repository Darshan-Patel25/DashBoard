const mongoose = require("mongoose");
const express = require("express");
const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");
const userrouter = express.Router();
const { fetchSocialStats } = require("../controllers/generateExcel");
const { auth } = require("../middlewares/auth");
const {
  registerUsercontroller,
  loginController,
  logout,
} = require("../controllers/users.controlers");
const { teleId } = require("../controllers/teleId");

// User authentication
userrouter.post("/register", registerUsercontroller);
userrouter.post("/login", loginController);
userrouter.get("/logout", auth, logout);
userrouter.put("/teleid", auth, teleId);

userrouter.get("/generate-excel", async (req, res) => {
  const username = req.query.username || "rajukani100";

  try {
    // Fetch social stats data
    const jsonData = await fetchSocialStats(username);
    if (!jsonData || !jsonData.Graph) {
      return res
        .status(400)
        .json({ error: "Invalid data received from SocialBlade" });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Social Media Data");

    // Add Header Row
    worksheet.columns = [
      { header: "Date", key: "date", width: 15 },
      { header: "Day", key: "day", width: 10 },
      { header: "Followers", key: "followers", width: 15 },
      { header: "Followers Growth", key: "followersGrowth", width: 20 },
      { header: "Followings", key: "followings", width: 15 },
      { header: "Followings Growth", key: "followingsGrowth", width: 20 },
      { header: "Tweets", key: "tweets", width: 10 },
      { header: "Tweets Growth", key: "tweetsGrowth", width: 15 },
    ];

    // Add Rows from JSON Data
    jsonData.Graph.forEach((data) => worksheet.addRow(data));

    // Styling Header Row
    worksheet.getRow(1).font = { bold: true, color: { argb: "FF0000" } };

    // Adding Graph Instructions (Optional)
    const chartInstructions = workbook.addWorksheet("Chart Instructions");
    chartInstructions.addRow([
      "Note: ExcelJS doesn't support direct graph generation.",
    ]);
    chartInstructions.addRow([
      "Use Excel's built-in features to create charts from the provided data.",
    ]);

    // Define the file path
    const filePath = path.join(__dirname, "SocialMediaDataWithCharts.xlsx");

    // Save the Workbook to a file
    await workbook.xlsx.writeFile(filePath);

    // Log the file creation
    console.log(
      "Excel file created successfully with instructions for chart generation."
    );

    // Send the file as a download response
    res.download(filePath, "SocialMediaDataWithCharts.xlsx", (err) => {
      if (err) {
        console.error("Error sending the file:", err.message);
        return res.status(500).send("Error sending the file");
      }

      // Optionally, clean up the file after sending it
      fs.unlink(filePath, (unlinkError) => {
        if (unlinkError) {
          console.error("Error deleting the file:", unlinkError.message);
        } else {
          console.log("Temporary file deleted:", filePath);
        }
      });
    });
  } catch (error) {
    console.error("Error generating Excel file:", error.message);
    res.status(500).json({ error: "Failed to generate Excel file." });
  }
});

module.exports = userrouter;
