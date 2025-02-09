import { Card, CardContent, Avatar, Typography, Chip } from "@mui/material";
import { Twitter, Facebook, Instagram } from "@mui/icons-material";

export default function PostCard({ content, scheduledTime, status, platform }) {
  // Choose an icon based on the platform
  const getPlatformIcon = () => {
    switch (platform) {
      case "twitter":
        return <Twitter />;
      case "facebook":
        return <Facebook />;
      case "instagram":
        return <Instagram />;
      default:
        return null;
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        bgcolor: "grey.900",
        color: "white",
        mt: 1,
        maxWidth: 400,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Avatar sx={{ bgcolor: "white", color: "blue", width: 56, height: 56 }}>
        {getPlatformIcon()}
      </Avatar>
      <CardContent sx={{ flex: 1, ml: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          {content}
        </Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <Typography variant="body2" color="grey.400">
              Status
            </Typography>
            <Typography variant="body2">{status}</Typography>
          </div>
          <div>
            <Typography variant="body2" color="grey.400">
              Scheduled Date
            </Typography>
            <Typography variant="body2">{scheduledTime}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
