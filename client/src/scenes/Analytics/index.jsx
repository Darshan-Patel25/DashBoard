
import React from 'react';
import Header from "components/Header";
import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import {
  DownloadOutlined,

  Email,
  

} from "@mui/icons-material";
import StatBox from 'components/StatBox';
import TelegramPost from '../../components/sentimentPost';
import LineChart from 'components/Linechart';
import SentimentChart from '../../components/sentimentchart';

const Analytics = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Sentiment Analytics" subtitle="Welcome to analytics page" />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
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
        {/* ROW 1 */}
        
        <Box
          gridColumn="span 12"
          gridRow="span 1"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
         
        
        <TelegramPost text="New Post" description="This is a new post"  date="2025-5-1" status="pending"/>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
         
         <LineChart />
    
        </Box>


        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
       
        >
          <StatBox
          title="Suggestion"

        />
           <ul style={{ 
  padding: "0", 
  margin: "0", 
  listStyle: "none", /* Adds numbers */
  fontSize: "18px", /* Increases font size */
  textAlign: "center", /* Centers text */
  fontWeight: "bold" /* Makes text bold */
}}>
  {[
    "LataMangeshkar", "ViratKohli",
   
  ].map((hashtag, index) => (
    <li key={index} >{hashtag}</li>
  ))}
</ul>
      

        </Box>

        <Box
          gridColumn="span 6"
          gridRow="span 1"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
          
       
        >
          <StatBox
          title="Overall Sentiment Analysis of posts"

        />
           
      
<SentimentChart />
        </Box>

       
      </Box>


    </Box>
  );
};

export default Analytics;
