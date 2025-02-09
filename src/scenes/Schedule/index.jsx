import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme, useMediaQuery, TextField } from "@mui/material";
import St from "components/St";
import StatBox from "components/StatBox";
import { Facebook, Twitter, FileCopy, Image, Mood, LocationOn } from "@mui/icons-material";
import Header from "../../components/Header";
import axios from "axios";
import Cookies from "js-cookie";

export default function Schedule() {
  const [post, setPost] = useState("");
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const [scheduledTime, setScheduledTime] = useState("");

  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  useEffect(() => {
    const fetchTrendingHashtags = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/comments/trending-hashtags");
        setTrendingHashtags(response.data.hashtags || []);
      } catch (error) {
        console.error("Error fetching trending hashtags:", error);
      }
    };
    fetchTrendingHashtags();
  }, []);

  const handleSchedulePost = async () => {
    if (!post.trim() || !scheduledTime) {
      alert("Please enter both a post and a valid date/time.");
      return;
    }

    const requestBody = {
      content: post,
      scheduledTime,
    };

    const token = Cookies.get("accessToken");
    if (!token) {
      console.error("Access token is missing.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/schedule/schedule-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to schedule the post.");
      }

      alert("Post scheduled successfully!");
      console.log("Response:", data);
    } catch (error) {
      console.error("Error scheduling the post:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleOptimizePost = async () => {
    if (!post.trim()) {
      alert("Please enter a post to optimize.");
      return;
    }

    try {
      const token = Cookies.get("accessToken");
      if (!token) {
        console.error("Access token is missing.");
        return;
      }

      const response = await fetch("http://localhost:8080/api/comments/correct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: post }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to optimize the post.");
      }

      const optimizedPost = data.correctedTweet || post;
      const hashtags = data.hashtags || "";

      setPost(`${optimizedPost} ${hashtags}`);
      alert("Post optimized and hashtags added!");
    } catch (error) {
      console.error("Error optimizing the post:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Box m="1rem 2rem">
      <Header title="Create post" />

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* Main Post Section */}
        <Box
          gridColumn="span 8"
          gridRow="span 5"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <StatBox title="Create post" />

          {/* Tabs */}
          <Box display="flex" borderBottom={1} borderColor="divider">
            <Button variant="text">Original</Button>
            <Button variant="text" startIcon={<Facebook sx={{ color: "#1877F2" }} />}>
              Facebook
            </Button>
            <Button variant="text" startIcon={<Twitter sx={{ color: "#1DA1F2" }} />}>
              Twitter
            </Button>
          </Box>

          {/* Textarea */}
          <Box mt={2}>
            <textarea
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="11"
              placeholder="What do you want to share?"
              value={post}
              onChange={(e) => setPost(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "white",
                color: "black",
              }}
            />
          </Box>

          {/* Icons */}
          <Box display="flex" justifyContent="center" gap={2} mt={2} color="gray">
            <St icon={<FileCopy sx={{ fontSize: 20 }} />} title="File" />
            <St icon={<Image sx={{ fontSize: 20 }} />} title="Image" />
            <St icon={<Mood sx={{ fontSize: 20 }} />} title="Emoji" />
            <St icon={<LocationOn sx={{ fontSize: 20 }} />} title="Location" />
          </Box>

          {/* Schedule Time Input */}
          <Box mt={2}>
            <Typography variant="subtitle1">Schedule Time (yyyy-mm-dd hh:mm):</Typography>
            <TextField
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              fullWidth
              sx={{ mt: 1 }}
              inputProps={{
                step: 60, // seconds step
              }}
            />
          </Box>

          {/* Statistics */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} gap={2}>
            <StatBox title="Total Posts" value="234" increase="+5%" />
            <StatBox title="Scheduled Posts" value="45" increase="+10%" />
          </Box>

          {/* Buttons */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#1877F2", color: "white" }}
              onClick={handleOptimizePost}
            >
              AI-Powered Post Optimization
            </Button>
            <Button variant="contained" sx={{ backgroundColor: "#1877F2", color: "white" }}>
              Direct Post
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#1877F2", color: "white" }}
              onClick={handleSchedulePost}
            >
              Schedule Post
            </Button>
          </Box>
        </Box>

        {/* Trending Hashtags Section */}
        <Box
          gridColumn="span 4"
          gridRow="span 5"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          sx={{
            overflowY: "auto",
          }}
        >
          <StatBox title="Top Trending Hashtags" />

          <ul
            style={{
              padding: "0",
              listStyle: "none",
              fontSize: "18px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {trendingHashtags.length > 0 ? (
              trendingHashtags.map((hashtag, index) => (
                <li key={index} style={{ padding: "5px 0" }}>
                  {hashtag}
                </li>
              ))
            ) : (
              <Typography>No hashtags available.</Typography>
            )}
          </ul>
        </Box>
      </Box>
    </Box>
  );
}
