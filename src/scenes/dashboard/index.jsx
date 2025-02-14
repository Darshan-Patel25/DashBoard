import React, { useEffect, useState } from "react";
import Header from "components/Header";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import LiveBadge from "homepage/components/LiveBadge";
import { Traffic, Email, PointOfSale, PersonAdd } from "@mui/icons-material";
import StatBox from "components/StatBox";
import LineChart from "../../components/ThreeBarchart";
import BarChart from "../../components/Barchart";
import Piechart from "../../components/Piechart";
import PostCard from "../../components/PostCard";
import Cookies from "js-cookie"; // Import the cookie library
import { FaUsers, FaUserCheck, FaCalendarAlt, FaCommentDots } from "react-icons/fa";
import { url } from "globalbackendurl";
import DefaultLoaderExample from "homepage/components/Loader";
import Loader from "homepage/components/Loader";


const DashboardPage = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  // State to hold API data and posts
  const [data, setData] = useState(null);
  const [posts, setPosts] = useState([]);

  // Fetch the API data
  useEffect(() => {
    const token = Cookies.get("accessToken"); // Get token from cookies
    // console.log(token)
    if (!token) {
      console.error("Access token is missing.");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/api/comments/stas`, {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to the request
          },
        });
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch(`${url}/api/schedule/showallpost`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to the request
          },

        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const postsData = await response.json();
        setPosts(postsData.posts || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
    fetchPosts();
  }, []);

  if (!data) {
    return <Typography> <Loader/> </Typography>;
  }

  const iconStyle = {
    color: theme.palette.secondary[300],
    fontSize: "24px"
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title={
            <Box display="flex" alignItems="center">
              Dashboard <LiveBadge />
            </Box>
          }
          subtitle="See insight on your Profile changed from April 8"
        />

        <Button
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          onClick={() => {
            fetch(`${url}/generate-pdf`)
              .then((response) => response.blob())
              .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "Report.pdf";
                a.click();
              })
              .catch((err) => console.error("Download Error:", err));
          }}
        >
          Download Reports
        </Button>
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
        {/* Stat Boxes */}
        <StatBox
          title="Followers"
          value={data.Followers}
          increase={data.Average.followers}
          description="Since last month"
          icon={<FaUsers style={iconStyle} />}
        />

        <StatBox
          title="Following"
          value={data.Following}
          increase={data.Average.followings}
          description="Since last month"
          icon={<FaUserCheck style={iconStyle} />}
        />

        <StatBox
          title="Tweets"
          value={data.Tweets}
          increase={data.Average.tweets}
          description="Since last month"
          icon={<FaCommentDots style={iconStyle} />}
        />

        <StatBox
          title="User Created On"
          value={data.UserCreated}
          increase=""
          description=""
          icon={<FaCalendarAlt style={iconStyle} />}
        />

        {/* Post Table */}
        <Box
          gridColumn="span 4"
          gridRow="span 5"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          sx={{

            overflowY: "auto",  // Vertical scrolling

          }}
        >
          <Header title="All Posts" subtitle="Schedule posts" />
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <PostCard
                key={index}
                content={post.content}
                scheduledTime={post.scheduledTime}
                status={post.status}
                platform={post.platform}
              />
            ))
          ) : (
            <Typography>No posts available.</Typography>
          )}
        </Box>

        {/* Charts */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <LineChart graphData={data.Graph} />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <BarChart graphData={data.Graph} />
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <Piechart />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
