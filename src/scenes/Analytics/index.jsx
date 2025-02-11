import React, { useEffect, useState } from "react";
import Header from "components/Header";
import { Box, Button, useTheme, useMediaQuery, Typography } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { DownloadOutlined } from "@mui/icons-material";
import StatBox from "components/StatBox";
import TelegramPost from "../../components/sentimentPost";
import Cookies from "js-cookie";
import EngagementBarChart from "components/EngagementGraph";

const convertMetric = (value) => {
  if (typeof value === "string") {
    if (value.endsWith("K")) {
      return parseFloat(value) * 1000;
    } else if (value.endsWith("M")) {
      return parseFloat(value) * 1000000;
    }
  }
  return parseFloat(value);
};

const Analytics = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [postedPosts, setPostedPosts] = useState([]);
  const [childData, setChildData] = useState({});
  const [engagementMetrics, setEngagementMetrics] = useState({
    likes: 0,
    replies: 0,
    views: 0,
    reposts: 0,
    bookmarks: 0,
  });

  const handleChildResponse = (data) => {
    setChildData(data);
    if (data.engagementMetrics) {
      setEngagementMetrics({
        likes: convertMetric(data.engagementMetrics.likes),
        replies: convertMetric(data.engagementMetrics.reply),
        views: convertMetric(data.engagementMetrics.views),
        reposts: convertMetric(data.engagementMetrics.reposts),
        bookmarks: convertMetric(data.engagementMetrics.bookmarks),
      });
    }
  };

  useEffect(() => {
    const fetchPostedPosts = async () => {
      try {
        const token = Cookies.get("accessToken");

        if (!token) {
          console.error("Access token not found in cookies.");
          return;
        }

        const response = await fetch("http://localhost:8080/api/schedule/show-posted-post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
        <Header title="Sentiment Analytics" subtitle="Welcome to the analytics page" />
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
          sx={{ maxHeight: "320px", overflowY: "auto" }}
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
                postId={post.postId}
                onResponse={(response) => handleChildResponse(response)}
              />
            ))
          ) : (
            <Typography>No posted posts available.</Typography>
          )}
        </Box>

        {/* Engagement Metrics Bar Chart */}
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <EngagementBarChart
            likes={engagementMetrics.likes}
            replies={engagementMetrics.replies}
            views={engagementMetrics.views}
            reposts={engagementMetrics.reposts}
            bookmarks={engagementMetrics.bookmarks}
          />
        </Box>

        {/* Suggestions */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <StatBox title="Summary of all comments" />
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
            <p>{childData.sentimentAnalysis || "No sentiment analysis available."}</p>
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
          <Typography variant="body1" color="textSecondary">
           
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Analytics;
