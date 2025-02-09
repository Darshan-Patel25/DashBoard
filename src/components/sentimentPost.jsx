import { Card, CardContent, Avatar, Typography, Box, Button } from "@mui/material";
import { Twitter } from "@mui/icons-material";

export default function SentimentPost({ text, description, date, onAdd }) {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        bgcolor: "grey.900",
        color: "white",
        mt: 1,
        width: "100%",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      {/* Logo on the left */}
      <Avatar sx={{ bgcolor: "white", color: "blue", width: 64, height: 64 }}>
        <Twitter sx={{ fontSize: 32 }} />
      </Avatar>

      {/* Content in the center */}
      <CardContent sx={{ flex: 1, ml: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          {text}
        </Typography>
        <Typography variant="body1" color="grey.400" mt={1}>
          {description}

          
        </Typography>
      </CardContent>

      {/* Date in the middle */}
      <Typography variant="h6" color="grey.400" sx={{ mx: 2 }}>
        {date}
      </Typography>

      {/* Add Button on the right */}
      <Button variant="contained" color="primary" onClick={onAdd}>
      Analyse Post
      </Button>
    </Card>
  );
}
