import React, { useState } from "react";
import Header from "components/Header";
import { Box, Button, Typography, TextField } from "@mui/material";
import { Telegram } from "@mui/icons-material";
import PostCard from "../../components/PostCard"; // Import PostCard component
import TelegramPost from "../../components/telegrampost"; // Import TelegramPost component
const SyncTelegramBot = () => {
  const [telegramId, setTelegramId] = useState("");
  const [telegramPosts, setTelegramPosts] = useState([]);

  // Function to save and generate post cards dynamically
  const handleSave = () => {
    if (telegramId.trim()) {
      const newPost = {
        id: telegramPosts.length + 1,
        text: telegramId,
        status: "Pending",
        date: new Date().toDateString(),
      };

      setTelegramPosts((prevPosts) => [newPost, ...prevPosts]);
      setTelegramId(""); // Clear input after saving
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
      <Header  subtitle="scheduled by Telegram bot"   />
      <TelegramPost text="New Post" description="This is a new post"  date="2025-5-1" status="pending"/>
      <TelegramPost text="New Post" description="This is a new post"  date="2025-5-1" status="pending"/>
      <TelegramPost text="New Post" description="This is a new post"  date="2025-5-1" status="pending"/>
    </Box>
   
  );
};

export default SyncTelegramBot;
