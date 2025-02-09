import { Card, CardContent, Avatar, Typography, Chip } from "@mui/material";
import { Twitter } from "@mui/icons-material";
import Header from "../components/Header";
export default function PostCard() {
  return (
    <>
   
    <Card sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: 'grey.900', color: 'white', mt:1, maxWidth: 400, borderRadius: 2, boxShadow: 3 }}>
      <Avatar sx={{ bgcolor: 'white', color: 'blue', width: 56, height: 56 }}>
        <Twitter />
      </Avatar>
      <CardContent sx={{ flex: 1, ml: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Buy ticket on discounted price!
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <Typography variant="body2" color="grey.400">
              Status
            </Typography>
            <Typography variant="body2">Pending</Typography>
          </div>
          <div>
            <Typography variant="body2" color="grey.400">
              Posted Date
            </Typography>
            <Typography variant="body2">1 Jan 2025</Typography>
          </div>
        </div>
      </CardContent>
      
    </Card>
    </>
  );
}
