import React from 'react';
import Header from "components/Header";
import { Box, Button, useTheme, useMediaQuery } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import {
  DownloadOutlined,
  Traffic,
  Email,
  PointOfSale,
  PersonAdd,
} from "@mui/icons-material";
import StatBox from 'components/StatBox';


//  Static Data
const staticData = {
  totalCustomers: 1234,
  todayStats: {
    totalSales: 4567,
  },
  thisMonthStats: {
    totalSales: 23456,
  },
  yearlySalesTotal: 123456,
};


const Analytics = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Business Performance" subtitle="See insight on your Profile changed from April 8" />

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
        <StatBox
          title="Average Impression"
          value={staticData.totalCustomers}
          increase="+14%"
          description="Since last month"
          icon={<Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        <StatBox
          title="Average Engagement Rate"
          value={staticData.todayStats.totalSales}
          increase="+21%"
          description="Since last month"
          icon={<PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        

        <StatBox
          title="Avg Reach"
          value={staticData.thisMonthStats.totalSales}
          increase="+5%"
          description="Since last month"
          icon={<PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />

        <StatBox
          title="Yearly Sales"
          value={staticData.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={<Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
        />
         <Box
          gridColumn="span 4"
          gridRow="span 5"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          
        </Box>
        
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          
        </Box>
       
      </Box>
    </Box>
  );
};

export default Analytics;
