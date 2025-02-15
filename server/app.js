const fs = require("fs");
const path = require("path");
const { TwitterApi } = require("twitter-api-v2");

// Get API keys from environment variables
const apiKey = "LfnZfITfPmJuq7vgD3g0bL8UG";
const apiSecret = "WLIFEBDdd8pbMe8yKt2sMJqyrCVneXEmXNuRbRSY64TPTfibdL";
const accessToken = "1885580449013248000-Hcj95TVkJvcxDwcPa0xyI9Pc9LA69F";
const accessSecret = "L2qIyxtml7itgJ9hFiaf9MAWPxj0ykESEAWo0e3Nag8QF";

if (!apiKey || !apiSecret || !accessToken || !accessSecret) {
  console.error(
    "Error: Missing Twitter API credentials in environment variables."
  );
  process.exit(1);
}

const client = new TwitterApi({
  appKey: apiKey,
  appSecret: apiSecret,
  accessToken: accessToken,
  accessSecret: accessSecret,
});
const rwClient = client.readWrite;
const imagePath = path.join(__dirname, "image.jpg");

async function postTweetWithRootImage() {
  try {
    const content = "Tweet from root directory image!";

    // Check if image exists
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file not found: ${imagePath}`);
    }

    // Read the image from the root directory
    const imageBuffer = fs.readFileSync(imagePath);

    // Upload media using v1 (only method available)
    const mediaId = await rwClient.v1.uploadMedia(imageBuffer, {
      mimeType: "image/jpeg",
    });

    // Post tweet with uploaded media
    const tweet = await rwClient.v2.tweet({
      text: content,
      media: { media_ids: [mediaId] },
    });

    console.log("Tweet posted successfully:", tweet.data.text);
  } catch (error) {
    console.error("Error posting tweet:", error);
  }
}

postTweetWithRootImage();
