import React, { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import St from "components/St";
import StatBox from "components/StatBox";
import { Facebook, Twitter, FileCopy, Image, Mood, LocationOn } from "@mui/icons-material";
import Header from "../../components/Header"
export default function Schedule() {
  const [post, setPost] = useState("");
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" bgcolor={theme.palette.background.default} p={2}>
    
      <Header title="ManageAccount The Post" subtitle="Create the post" />
    
      <Box width="100%" maxWidth="1200px" bgcolor={theme.palette.background.alt} boxShadow={3} borderRadius={2} p={3}>
        <Typography variant="h3" sx={{ color: theme.palette.primary.main, textAlign: "center", mb: 3 }}>
          Create Post
        </Typography>

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
            rows="12"
            placeholder="What do you want to share?"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </Box>

        {/* Icons */}
        <Box display="flex" justifyContent="center" gap={2} mt={3} color="gray">
          <St icon={<FileCopy />} title="File" />
          <St icon={<Image />} title="Image" />
          <St icon={<Mood />} title="Emoji" />
          <St icon={<LocationOn />} title="Location" />
        </Box>

        {/* Statistics */}
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={2} mt={4}>
          <StatBox title="Total Posts" value="234" increase="+5%" icon={<FileCopy />} description="Growth this month" />
          <StatBox title="Scheduled Posts" value="45" increase="+10%" icon={<Image />} description="Pending approval" />
        </Box>

        {/* Buttons */}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="outlined">Save as Draft</Button>
          <Button variant="contained" sx={{ backgroundColor: "#1877F2", color: "white" }}>
            Add to Queue
          </Button>
        </Box>
      </Box>
    </Box>
    </Box>
  );
}
