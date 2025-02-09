const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.tweetCorrection = async (req, res) => {
  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Content cannot be empty" });
  }

  try {
    const prompt = `${content} fix grammar and English, also give me hashtags for this tweet`;

    const result = await model.generateContent(prompt);

    // Log the full response to check the structure
    console.log("Gemini API Response:", result);

    let correctedTweet = "";
    let hashtags = "";

    if (result && result.response && result.response.text) {
      const fullResponse = result.response.text();

      // Split the response based on newline character '\n'
      const parts = fullResponse.split("\n");

      // Extract corrected tweet before the first newline
      correctedTweet = parts[0].trim();

      // Extract hashtags from the remaining parts
      const hashtagResponse = parts.slice(1).join(" "); // Join remaining parts to handle hashtags
      const hashtagRegex = /#\w+/g; // Regex to capture words starting with '#'

      const hashtagMatches = hashtagResponse.match(hashtagRegex);

      if (hashtagMatches) {
        hashtags = hashtagMatches.join(" "); // Join matched hashtags with a space
      } else {
        hashtags = ""; // If no hashtags are found, set it as an empty string
      }
    } else {
      correctedTweet = "Error: Could not parse response. Check logs.";
    }

    res.json({
      correctedTweet: correctedTweet,
      hashtags: hashtags, // Include hashtags in the response
    });
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res
      .status(500)
      .json({ error: "Something went wrong. Please try again later." });
  }
};
