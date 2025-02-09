import React, { useState } from "react";
import { Button, Card, CardContent, Typography, TextField } from "@mui/material";
import { Twitter } from "@mui/icons-material";

const TweetSuggestionApp = () => {
  const [tweet, setTweet] = useState("");

  const postTweet = () => {
    if (tweet.length > 0 && tweet.length <= 280) {
      alert("Your tweet has been posted!");
    } else {
      alert("Please ensure your tweet is within the character limit (280).");
    }
  };

  return (
    <Card style={{ width: 350,height:320, padding: 20,backgroundColor: 'transparent', color: 'white', mt:1, borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" style={{ marginBottom: 10 }}>
          Personalized Tweet Suggestions
        </Typography>

        <Typography variant="body1" color="textSecondary" style={{ marginBottom: 15 }}>
          Follow these tips for effective tweets:
        </Typography>

        <ul>
          <li>Post at optimal times (8-10 AM or 5-7 PM).</li>
          <li>Use visuals like images or GIFs for higher engagement.</li>
          <li>Keep your tweet concise (70-100 characters).</li>
          <li>Include 1-3 relevant hashtags to boost visibility.</li>
          <li>Use a clear Call-to-Action (e.g., "Reply your thoughts!").</li>
        </ul>

        
        
      </CardContent>
    </Card>
  );
};

export default TweetSuggestionApp;