import React from 'react';
import Header from "components/Header";
import { Box, useTheme, useMediaQuery, Typography, Button } from "@mui/material";
import St from 'components/St';

import { useNavigate } from 'react-router-dom';
import B1 from "assets/b1.jpeg"
import B2 from "assets/b2.jpeg"
import B3 from "assets/b3.jpeg"
import B4 from "assets/b4.jpeg"
import B5 from "assets/b5.jpeg"
import B6 from "assets/b6.jpeg"
import B7 from "assets/b7.jpeg"
import B8 from "assets/b8.jpeg"



const socialNetworks = [
  { name: 'Facebook', icon:<img src={B1} alt="Facebook" style={{ width: 70, height:70 ,borderRadius: '50%'}} />, buttons: ['Connect Page', 'Connect Group'] },
  { name: 'Twitter', icon: <img src={B2} alt="Facebook" style={{ width: 70, height:70 ,borderRadius: '50%'}} />, buttons: ['Connect Profile'], checkbox: 'Follow us' },
  { name: 'LinkedIn', icon: <img src={B3} alt="Facebook" style={{ width: 70, height:70 ,borderRadius: '50%'}} />, buttons: ['Connect Profile', 'Connect Page'] },
  { name: 'Pinterest', icon: <img src={B4} alt="Facebook" style={{ width: 70, height:70 ,borderRadius: '50%'}} />, buttons: ['Connect Board'] },
  { name: 'Google My Business', icon: <img src={B5} alt="Facebook" style={{ width: 70, height:70 ,borderRadius: '50%'}} />, buttons: ['Connect Location'] },
  { name: 'Instagram', icon: <img src={B6} alt="Facebook" style={{ width: 70, height:70 ,borderRadius: '50%'}} />, buttons: ['Connect Personal', 'Connect Business'] },
  { name: 'Reminder for TikTok', icon:<img src={B7} alt="Facebook" style={{ width: 70, height:70 ,borderRadius: '50%'}} />, buttons: ['Connect Profile'] },
  { name: 'Tumblr', icon: <img src={B8} alt="Facebook" style={{ width: 70, height:70 ,borderRadius: '50%'}} />, buttons: ['Connect Blog'] },
];

const ConnectAccount = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const navigate = useNavigate();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ConnectAccount The Post" subtitle="Create the post" />
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? "span 3" : "span 12" },
        }}
      >
        {socialNetworks.map((network, index) => (
          <Box
            key={index}
            backgroundColor={theme.palette.background.alt}
            p="1rem"
            borderRadius="0.55rem"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <St icon={network.icon} title={network.name} />
            {network.buttons.map((btn, idx) => (
              <Button
                key={idx}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 1 }}
                onClick={() => navigate('/connectpage')} 

              >
                {btn}
              </Button>
            ))}
            {network.checkbox && (
              <Box mt={1}>
                <label>
                  <input type="checkbox" /> {network.checkbox}
                </label>
              </Box>
            )}
            <Box display="flex" justifyContent="space-between" width="100%" mt={3}>
              <Typography variant="body2">Accounts: 0</Typography>
              <Typography variant="body2">Queue Posts: 0</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ConnectAccount;