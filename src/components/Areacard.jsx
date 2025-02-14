import { Card, CardContent, Typography, Button, Box } from "@mui/material";

export default function CompetitorCard({ name, address }) {
  return (
    <Card sx={{ width: "100%", p: 1, bgcolor: "white", color: "black", mt: 1.5, borderRadius: 2, boxShadow: 2 }}>
      <CardContent sx={{ padding: "8px !important", minHeight: "80px" }}>
        {/* Header with Button in front of Competitor Name */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "1rem" }}>
          {name || "Competitor Name"}
          </Typography>
          <Button variant="contained" color="primary" size="small" sx={{ minHeight: "30px", fontSize: "0.75rem", px: 1.5 }}>
            Track
          </Button>
        </Box>

        {/* Address Section */}
        <Typography variant="body2" color="grey.700" sx={{ fontSize: "0.8rem", mt: 0.5 }}>
          Address
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "0.9rem", mt: 0.3 }}>
          {address || "No address available"}
        </Typography>
      </CardContent>
    </Card>
  );
}
