import React, { useEffect, useState } from "react";
import Header from "components/Header";
import { Box, Button, useTheme, useMediaQuery, Typography, LinearProgress } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import StatBox from "components/StatBox";
import TelegramPost from "../../components/sentimentPost";
import Cookies from "js-cookie";
import { DownloadOutlined } from "@mui/icons-material";
import EngagementBarChart from "components/EngagementGraph";
import { url } from "globalbackendurl";
import Doublechart from "../../components/doublePi"
const convertMetric = (value) => {
  if (typeof value === "string") {
    value = value.replace(/,/g, ""); // Remove commas
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
  const [positive, setpositive] = useState();
  const [negative, setnegative] = useState();
  const [Neutral, setneutral] = useState();
  const [childData,setChildData] = useState({});
  const [engagementMetrics, setEngagementMetrics] = useState({
    likes: 0,
    replies: 0,
    views: 0,
    reposts: 0,
    bookmarks: 0,
  });

const handleChildResponse = async (data) => {
  setChildData(data);
  console.log("Sentiment comments:", data.topComments);

  if (data.engagementMetrics) {
    setEngagementMetrics({
      likes: convertMetric(data.engagementMetrics.likes),
      replies: convertMetric(data.engagementMetrics.reply),
      views: convertMetric(data.engagementMetrics.views),
      reposts: convertMetric(data.engagementMetrics.reposts),
      bookmarks: convertMetric(data.engagementMetrics.bookmarks),
    });
  }

  if (data.topComments && data.topComments.length > 0) {
    try {
      const response = await fetch("https://8d11-202-129-240-131.ngrok-free.app/analyze_sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comments: data.topComments }),
      });

      if (!response.ok) {
        console.error(`Error analyzing comments: ${response.status}`);
        return;
      }

      const sentimentResult = await response.json();
      // console.log("Sentiment Analysis Result:", sentimentResult);
      console.log("Sentiment Analysis Result:", sentimentResult.
sentiment_distribution
.
Negative
);
setnegative(sentimentResult.
sentiment_distribution
.
Negative)
      console.log("Sentiment Analysis Result:", sentimentResult.
sentiment_distribution
.
Neutral);
setneutral(sentimentResult.
sentiment_distribution
.
Neutral)
      console.log("Sentiment Analysis Result:", sentimentResult.
sentiment_distribution
.
Positive);
setpositive(sentimentResult.
sentiment_distribution
.
Positive)

    } catch (error) {
      console.error("Error analyzing comments:", error);
    }
  } else {
    console.warn("No top comments available to analyze.");
  }
};


  const handlePdfDownload = () => {
    fetch(`${url}/generate-pdf`)
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
    fetch(`${url}/api/user/generate-excel`, {
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

  useEffect(() => {
    const fetchPostedPosts = async () => {
      try {
        const token = Cookies.get("accessToken");

        if (!token) {
          console.error("Access token not found in cookies.");
          return;
        }

        const response = await fetch(`${url}/api/schedule/show-posted-post`, {
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

  const getSentimentScore = () => {
    if (childData.sentimentCategory === "positive") return 90;
    if (childData.sentimentCategory === "negative") return 10;
    return 50; // Neutral
  };

  const getProgressColor = () => {
    if (childData.sentimentCategory === "positive") return "success";
    if (childData.sentimentCategory === "negative") return "error";
    return "warning"; // Neutral
  };

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
          p="0.5rem"
          borderRadius="0.55rem"
        >
          <StatBox title="Graph" />

          {childData.engagementMetrics ? <EngagementBarChart
            likes={engagementMetrics.likes}
            replies={engagementMetrics.replies}
            views={engagementMetrics.views}
            reposts={engagementMetrics.reposts}
            bookmarks={engagementMetrics.bookmarks}
          /> : <ul style={{
            padding: "0",
            margin: "0",
            listStyle: "none",
            fontSize: "18px",
            textAlign: "center",
            fontWeight: "bold",
          }}><p>No graph available.</p></ul>}
        </Box>

        {/* Suggestions */}
        <Box
          gridColumn="span 6"
          gridRow="span 1"
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

        {/* Sentiment Analysis Progress Bar */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <StatBox title="Overall Sentiment Analysis of posts" />
          <Box mt="1rem">
            {childData ? <>
             <Doublechart positive={positive} negative={negative} neutral={Neutral} />
            </> : <ul
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
            </ul>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Analytics;