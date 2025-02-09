import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import St from "components/St";
import StatBox from "components/StatBox";
import { Facebook, Twitter, FileCopy, Image, Mood, LocationOn } from "@mui/icons-material";
import Header from "../../components/Header";
import axios from "axios";

export default function Schedule() {
  const [post, setPost] = useState("");
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  // Fetch trending hashtags from API
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
          gridRow="span 4"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <StatBox title="Create post" />

          {/* Tabs */}
          <Box display="flex" borderBottom={1} borderColor="divider">
            <Button variant="text">Original</Button>
            <Button variant="text" startIcon={<Facebook sx={{ color: "#1877F2" }} />}>Facebook</Button>
            <Button variant="text" startIcon={<Twitter sx={{ color: "#1DA1F2" }} />}>Twitter</Button>
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
                color: "black"
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

          {/* Statistics */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={0} gap={2}>
            <StatBox title="Total Posts" value="234" increase="+5%" />
            <StatBox title="Scheduled Posts" value="45" increase="+10%" />
          </Box>

          {/* Buttons */}
          <Box display="flex" justifyContent="space-between" mt={0}>
            <Button variant="contained" sx={{ backgroundColor: "#1877F2", color: "white" }}>
              AI-Powered Post Optimization
            </Button>
            <Button variant="contained" sx={{ backgroundColor: "#1877F2", color: "white" }}>
              Direct Post
            </Button>
            <Button variant="contained" sx={{ backgroundColor: "#1877F2", color: "white" }}>
              Schedule Post
            </Button>
          </Box>
        </Box>

        {/* Trending Hashtags Section */}
        <Box
          gridColumn="span 4"
          gridRow="span 4"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          sx={{
            overflowY: "auto",
            
          }}
        >
          <StatBox title="Top Trending Hashtags" />

          <ul style={{
            padding: "0",
            listStyle: "none",
            fontSize: "18px",
            textAlign: "center",
            fontWeight: "bold"
          }}>
            {trendingHashtags.length > 0 ? (
              trendingHashtags.map((hashtag, index) => (
                <li key={index} style={{ padding: "5px 0" }}>{hashtag}</li>
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
