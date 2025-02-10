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

  const handlePdfDownload = () => {
    fetch(`http://localhost:8080/generate-pdf`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Report.pdf`;
        a.click();
      })
      .catch((err) => console.error("Download Error:", err));
  };

  const handleExcelDownload = () => {
    fetch("http://localhost:8080/api/user/generate-excel", {
      method: "GET",
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "SocialMediaDataWithCharts.xlsx";
        a.click();
        window.URL.revokeObjectURL(url); // Cleanup
      })
      .catch((err) => console.error("Download Error:", err));
  }

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Sentiment Analytics" subtitle="Welcome to the analytics page" />
        <Box display="flex" gap="10px">
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => handlePdfDownload()}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download PDF
          </Button>

          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
            onClick={() => handleExcelDownload()}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Excel
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
