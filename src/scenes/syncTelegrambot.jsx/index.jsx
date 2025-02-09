import React, { useEffect, useState } from "react";
import Header from "components/Header";
import { Box, Button, Typography, TextField } from "@mui/material";
import { Telegram } from "@mui/icons-material";
import PostCard from "../../components/PostCard"; // Import PostCard component
import TelegramPost from "../../components/telegrampost"; // Import TelegramPost component
const SyncTelegramBot = () => {
  const [telegramId, setTelegramId] = useState("");
  const [telegramPosts, setTelegramPosts] = useState([]);



  useEffect(() => {
    const fetchTelegramPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/schedule/get-post-telegram-bot", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Ensures cookies are sent for authentication
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.message);

        // Map response data to match TelegramPost props
        const formattedPosts = data.data.map((post) => ({
          text: post.content,
          description: `Scheduled for ${post.platform}`,
          date: post.scheduledTime,
          status: post.status,
        }));

        setTelegramPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchTelegramPosts();
  }, []);

  // Function to save and generate post cards dynamically
  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/user/teleid", {
        method: "PUT", // Change to PUT
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Ensures authentication cookies (JWT) are sent
        body: JSON.stringify({ telegramId }),
      });


      const data = await response.json();

      if (!data.success) throw new Error(data.message);

      // If successful, add post locally
      const newPost = {
        id: telegramPosts.length + 1,
        text: telegramId,
        status: "Pending",
        date: new Date().toDateString(),
      };

      setTelegramPosts((prevPosts) => [newPost, ...prevPosts]);
      setTelegramId(""); // Clear input after saving
    } catch (error) {
      console.error("Error saving Telegram ID:", error);
    }
  };


  return (

    <Box m="1.5rem 2.5rem">
      <Header title="Sync Telegram Bot" />
      <Box display="flex" alignItems="center" gap={2} mt={3}>
        <Telegram sx={{ fontSize: 40, backgroundColor: "blue", color: "white", borderRadius: "50%", p: 1 }} />
        <Typography variant="h5">
          Effortlessly schedule your posts without the need to log into a dashboard
        </Typography>
      </Box>

      {/* Input Box for Telegram ID */}
      <Box mt={4} p={3} border="1px solid #ccc" borderRadius="8px" textAlign="center">
        <TextField
          label="Enter Telegram ID"
          variant="outlined"
          fullWidth
          value={telegramId}
          onChange={(e) => setTelegramId(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleSave}
          disabled={!telegramId.trim()}
        >
          Save & Show Posts
        </Button>
      </Box>

      <br />
      <Header subtitle="scheduled by Telegram bot" />
      {/* Render Telegram Posts Dynamically */}
      {telegramPosts.length > 0 ? (
        telegramPosts.map((post, index) => (
          <TelegramPost key={index} text={post.text} description={post.description} date={post.date} status={post.status} />
        ))
      ) : (
        <Typography>No scheduled posts available.</Typography>
      )}
    </Box>

  );
};

export default SyncTelegramBot;
