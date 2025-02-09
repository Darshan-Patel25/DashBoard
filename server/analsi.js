const express = require("express");
const axios = require("axios");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const puppeteer = require("puppeteer");

// Replace with your Twitter API Bearer Token
const BEARER_TOKEN =
  "AAAAAAAAAAAAAAAAAAAAAIWcygEAAAAAd8YeA59kBwmwVWMG8ytVKZHLNWY%3DLzlvZNFqwhOXYFkBac9HTPAnhSYuiAOg2eDEN6f5JbdBi15ZND";

const app = express();
const port = 3000; // Change this to your preferred port

// Fetch Twitter user data from Twitter API
async function fetchTwitterData(username) {
  try {
    const response = await axios.get(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    // Fetch user details and metrics
    const user = response.data.data;
    const followersCount = user.public_metrics.followers_count;
    const tweetCount = user.public_metrics.tweet_count;
    const followingCount = user.public_metrics.following_count;

    // Example of tweet engagement (you can extend to fetch more tweets as needed)
    const tweetsResponse = await axios.get(
      `https://api.twitter.com/2/users/${user.id}/tweets`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );

    const tweets = tweetsResponse.data.data.map((tweet) => ({
      text: tweet.text,
      likeCount: tweet.public_metrics.like_count,
      retweetCount: tweet.public_metrics.retweet_count,
      replyCount: tweet.public_metrics.reply_count,
    }));

    return { user, followersCount, tweetCount, followingCount, tweets };
  } catch (error) {
    console.error("Error fetching Twitter data:", error);
    throw new Error("Failed to fetch data from Twitter");
  }
}

// Create a PDF with Twitter data
async function createPDF(username) {
  const { user, followersCount, tweetCount, followingCount, tweets } =
    await fetchTwitterData(username);

  const doc = new PDFDocument();
  const filePath = `Twitter_Analytics_${username}.pdf`;
  doc.pipe(fs.createWriteStream(filePath));

  // Add title and user details
  doc
    .fontSize(18)
    .text(`Twitter Analytics for ${user.username}`, { align: "center" });

  doc.moveDown();
  doc.fontSize(14).text(`Name: ${user.name}`);
  doc.text(`Username: @${user.username}`);
  doc.text(`Followers: ${followersCount}`);
  doc.text(`Following: ${followingCount}`);
  doc.text(`Tweets: ${tweetCount}`);

  doc.moveDown();
  doc.text("Recent Tweets and Engagement", { underline: true });

  tweets.forEach((tweet) => {
    doc.moveDown();
    doc.text(`Tweet: ${tweet.text}`);
    doc.text(`Likes: ${tweet.likeCount}`);
    doc.text(`Retweets: ${tweet.retweetCount}`);
    doc.text(`Replies: ${tweet.replyCount}`);
  });

  doc.moveDown();
  doc.text("Generating chart for followers and tweets...", { italic: true });

  // Generate chart using Puppeteer
  await generateChart(followersCount, tweetCount, filePath);

  doc.end();
  console.log(`PDF generated: ${filePath}`);
  return filePath;
}

// Generate a chart using Puppeteer and Chart.js
async function generateChart(followersCount, tweetCount, filePath) {
  const chartData = {
    labels: ["Followers", "Tweets"],
    datasets: [
      {
        data: [followersCount, tweetCount],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(`
    <html>
      <body>
        <canvas id="myChart" width="400" height="400"></canvas>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script>
          var ctx = document.getElementById('myChart').getContext('2d');
          new Chart(ctx, {
            type: 'pie',
            data: ${JSON.stringify(chartData)},
            options: ${JSON.stringify(chartOptions)}
          });
        </script>
      </body>
    </html>
  `);

  // Wait for the chart to render
  await page.waitForSelector("#myChart");

  // Save the chart as an image
  await page.screenshot({ path: "chart.png", fullPage: true });

  // Insert chart image into the PDF
  const doc = new PDFDocument();
  doc.image("chart.png", { width: 400, align: "center" });
  doc.pipe(fs.createWriteStream(filePath));

  await browser.close();
  fs.unlinkSync("chart.png"); // Clean up chart image
}

// Define route to generate and download the PDF
app.get("/generate-pdf/:username", async (req, res) => {
  const username = req.params.username;

  try {
    const filePath = await createPDF(username);
    res.download(filePath, (err) => {
      if (err) {
        console.error("Error sending the file:", err);
        res.status(500).send("Error sending the file");
      } else {
        // Optionally, clean up the file after download
        fs.unlink(filePath, (unlinkError) => {
          if (unlinkError) {
            console.error("Error deleting the file:", unlinkError.message);
          } else {
            console.log(`Temporary file deleted: ${filePath}`);
          }
        });
      }
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
