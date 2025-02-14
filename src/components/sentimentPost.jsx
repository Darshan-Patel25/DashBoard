import { Card, CardContent, Avatar, Typography, Box, Button, CircularProgress } from "@mui/material";
import { Twitter } from "@mui/icons-material";
import Cookies from "js-cookie";
import { url } from "globalbackendurl";
import { useState } from "react";

export default function SentimentPost({ onResponse, text, description, date, postId }) {
  const [loading, setLoading] = useState(false); // Loading state

  const analyzePost = async () => {
    if (!postId) {
      alert("Post ID not found. Please try again.");
      return;
    }

    try {
      setLoading(true); // Set loading to true when analysis starts
      const token = Cookies.get("accessToken");

      if (!token) {
        alert("Access token not found in cookies.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${url}/api/comments/sentiment-comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ tweetId: postId }),
      });

      if (!response.ok) {
        alert(`Failed to analyze post. Status: ${response.status}`);
        setLoading(false);
        return;
      }

      const data = await response.json();
      onResponse(data);
      // alert(`Sentiment Category: ${data.sentimentCategory}`);
    } catch (error) {
      console.error("Error analyzing post:", error);
      alert("Error analyzing post. Please try again.");
    } finally {
      setLoading(false); // Reset loading state when API call is finished
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        bgcolor: "grey.900",
        color: "white",
        mt: 1,
        width: "100%",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Logo on the left */}
      <Avatar sx={{ bgcolor: "white", color: "blue", width: 64, height: 64 }}>
        <Twitter sx={{ fontSize: 32 }} />
      </Avatar>

      {/* Content in the center */}
      <CardContent sx={{ flex: 1, ml: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          {text}
        </Typography>
        <Typography variant="body1" color="grey.400" mt={1}>
          {description}
        </Typography>
      </CardContent>

      {/* Date in the middle */}
      <Typography variant="h6" color="grey.400" sx={{ mx: 2 }}>
        {date}
      </Typography>

      {/* Analyze Button on the right */}
      <Button
        variant="contained"
        color="primary"
        onClick={analyzePost}
        disabled={loading} // Disable when loading
        sx={{ minWidth: "150px" }} // Ensure proper button width
      >
        {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Analyze Post"}
      </Button>
    </Card>
  );
}
