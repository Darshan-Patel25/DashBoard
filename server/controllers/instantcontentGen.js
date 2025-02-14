const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.instantcontent = async (req, res) => {
  const { content } = req.body;

  if (!content || content.trim() === "") {
    return res.status(400).json({ error: "Content cannot be empty" });
  }

  try {
    const prompt = `Generate high-quality content, natural-sounding content based on: "${content}". Improve grammar, clarity, and engagement while keeping the original intent. If no length is specified, generate up to 50 words. Ensure it feels human-written and impactful. Add relevant, trending hashtags. Output: "Final Content: {refined_content} | Hashtags: {hashtags}".`;

    const result = await model.generateContent(prompt);

    let correctedTweet = "";
    let hashtags = "";

    if (result && result.response && result.response.text) {
      const fullResponse = result.response.text();

      // Extract the "Final Content" and "Hashtags" from the response
      const contentMatch = fullResponse.match(/Final Content:\s*(.+?)\s*\|/);
      const hashtagMatch = fullResponse.match(/Hashtags:\s*(.+)/);

      correctedTweet = contentMatch
        ? contentMatch[1].trim()
        : "Error: Could not extract content.";
      hashtags = hashtagMatch ? hashtagMatch[1].trim() : "";
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
