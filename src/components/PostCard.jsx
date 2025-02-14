
import { Card, CardContent, Avatar, Typography, Chip } from "@mui/material";
import { Twitter, Facebook } from "@mui/icons-material";

export default function PostCard({ content, scheduledTime, status, platform }) {
  // Platform icon rendering logic
  const renderPlatformIcon = (platform) => {
    switch (platform) {
      case "twitter":
        return <Twitter />;
      case "facebook":
        return <Facebook />;
      default:
        return null;
    }
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'grey.900', color: 'white', mt: 1, maxWidth: 400, borderRadius: 2, boxShadow: 3 }}>
      <Avatar sx={{ bgcolor: 'white', color: platform === "twitter" ? '#1DA1F2' : '#1877F2', width: 56, height: 56 }}>
        {renderPlatformIcon(platform)}
      </Avatar>
      <CardContent sx={{ flex: 1, ml: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          {content || "No content available."}
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <Typography variant="body2" color="grey.400">
              Status
            </Typography>
            <Typography variant="body2">{status || "Unknown"}</Typography>
          </div>
          <div>
            <Typography variant="body2" color="grey.400">
              Scheduled Time
            </Typography>
            <Typography variant="body2">{scheduledTime || "N/A"}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}