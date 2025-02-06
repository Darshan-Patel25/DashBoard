import React from "react";
import { 
  Box, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText, 
  Typography, 
  useTheme 
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AccountDrawer = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 300,
          backgroundColor: theme.palette.background.paper,
          padding: "1rem",
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight="bold">
          Account Options
        </Typography>
        <IconButton onClick={onClose}>
          <ChevronLeft />
        </IconButton>
      </Box>

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation("/connectaccount")}>
            <ListItemText primary="Connect Account" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => handleNavigation("/manageaccount")}>
            <ListItemText primary="Manage Account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AccountDrawer;
