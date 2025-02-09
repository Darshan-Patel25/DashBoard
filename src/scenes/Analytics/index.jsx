import React, { useEffect, useState } from "react";
import Header from "components/Header";
import { Box, Button, useTheme, useMediaQuery, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { DownloadOutlined } from "@mui/icons-material";
import StatBox from "components/StatBox";
import TelegramPost from "../../components/sentimentPost";
import LineChart from "components/Linechart";
import SentimentChart from "../../components/sentimentchart";
import Cookies from "js-cookie";

const Analytics = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [postedPosts, setPostedPosts] = useState([]);

  useEffect(() => {
    const fetchPostedPosts = async () => {
      try {
        // Get access token from cookies
        const token = Cookies.get("accessToken");

        if (!token) {
          console.error("Access token not found in cookies.");
          return;
        }

        // Fetch posted posts
        const response = await fetch("http://localhost:8080/api/schedule/show-posted-post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch posted posts");
          return;
        }

        const data = await response.json();
        setPostedPosts(data.data || []);
      } catch (error) {
        console.error("Error fetching posted posts:", error);
      }
    };

    fetchPostedPosts();
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Sentiment Analytics" subtitle="Welcome to analytics page" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

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
        {/* Scrollable Posted Posts Section */}
        <Box
          gridColumn="span 12"
          gridRow="span 1"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          sx={{
            maxHeight: "320px",
            overflowY: "auto",
          }}
        >
          <StatBox title="Posted Posts" />
          {postedPosts.length > 0 ? (
            postedPosts.map((post, index) => (
              <TelegramPost
                key={index}
                text={post.content}
                description={post.description || "No description"}
                date={post.scheduledTime || "N/A"}
                status={post.status}
              />
            ))
          ) : (
            <Typography>No posted posts available.</Typography>
          )}
        </Box>

        {/* Line Chart */}
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <LineChart />
        </Box>

        {/* Suggestions */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <StatBox title="Suggestions" />
          <ul
            style={{
              padding: "0",
              margin: "0",
              listStyle: "none",
              fontSize: "18px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {["LataMangeshkar", "ViratKohli"].map((hashtag, index) => (
              <li key={index}>{hashtag}</li>
            ))}
          </ul>
        </Box>

        {/* Sentiment Chart */}
        <Box
          gridColumn="span 6"
          gridRow="span 1"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <StatBox title="Overall Sentiment Analysis of posts" />
          <SentimentChart />
        </Box>
      </Box>
    </Box>
  );
};

export default Analytics;
