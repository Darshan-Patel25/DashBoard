import React from "react";
import Header from "components/Header";
import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { DownloadOutlined } from "@mui/icons-material";
import StatBox from "components/StatBox";
import TelegramPost from "../../components/sentimentPost";
import LineChart from "components/Linechart";
import SentimentChart from "../../components/sentimentchart";

const Analytics = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

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
        {/* Scrollable Telegram Posts */}
        <Box
          gridColumn="span 12"
          gridRow="span 1"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          sx={{
            maxHeight: "320px", // Adjust height as needed
            overflowY: "auto", // Enables scrolling when content exceeds height
          }}
        >
          <TelegramPost text="New Post 1" description="This is a new post" date="2025-5-1" status="pending" />
          <TelegramPost text="New Post 2" description="This is a new post" date="2025-5-2" status="approved" />
          <TelegramPost text="New Post 3" description="This is a new post" date="2025-5-3" status="rejected" />
          <TelegramPost text="New Post 4" description="This is a new post" date="2025-5-4" status="pending" />
          <TelegramPost text="New Post 5" description="This is a new post" date="2025-5-5" status="approved" />
          <TelegramPost text="New Post 6" description="This is a new post" date="2025-5-6" status="rejected" />
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
