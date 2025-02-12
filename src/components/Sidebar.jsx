import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { RiCalendarScheduleLine } from "react-icons/ri";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ReceiptLongOutlined,
  DataUsageOutlined,
  AccountCircleOutlined,
  CalendarMonth,
  Telegram,
  TrendingUpOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const navItems = [
  { text: "Dashboard", icon: <HomeOutlined /> },
  { text: "Analytics", icon: <DataUsageOutlined /> },
  { text: "Calender", icon: <CalendarMonth /> },
  {
    text: "Schedule", icon: <RiCalendarScheduleLine style={{ fontSize: "20px" }} />
  },
  { text: "Account", icon: <AccountCircleOutlined />, },
  { text: "Competitor-Insight  ", icon: <TrendingUpOutlined /> },
  { text: "Sync-TelegramBot", icon: <Telegram /> },
];

const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      alert("Authentication required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/user/getuserdetails", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setUser(result.user);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("Failed to fetch user details.");
    }
  };

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              height: "100vh",
              overflow: "hidden",
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box display="flex" flexDirection="column" height="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Typography variant="h4" fontWeight="bold">
                  TRENDIFY
                </Typography>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>

            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }

                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor: active === lcText ? theme.palette.primary[500] : "transparent",
                        color: active === lcText ? theme.palette.common.white : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color: active === lcText ? theme.palette.common.white : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && <ChevronRightOutlined sx={{ ml: "auto" }} />}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>

            <Box mt="auto">
              <Divider />
              <FlexBetween textTransform="none" gap="0.5rem" m="1rem ">
                <Box
                  component="img"
                  alt="profile"
                  src={user?.profilePicture || "default-profile-picture-url"}
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.9rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user?.name || "User"}
                  </Typography>
                  <Typography fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }}>
                    {user?.email || "No email available"}
                  </Typography>
                </Box>
                <SettingsOutlined
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "25px",
                  }}
                />
              </FlexBetween>
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
