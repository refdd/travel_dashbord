import React from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SouthAmericaIcon from "@mui/icons-material/SouthAmerica";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LayersIcon from "@mui/icons-material/Layers";
import WebIcon from "@mui/icons-material/Web";
import QuizIcon from "@mui/icons-material/Quiz";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import HotelIcon from "@mui/icons-material/Hotel";
import HouseboatIcon from "@mui/icons-material/Houseboat";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ReviewsIcon from "@mui/icons-material/Reviews";
const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const isDrowerOpen = useSelector((state) => state.isDrawer?.value);

  const menuItems = [
    { text: "Home", icon: <InboxIcon />, path: "/" },
    { text: "blog", icon: <BorderColorIcon />, path: "/blog" },
    { text: "region", icon: <SouthAmericaIcon />, path: "/region" },
    { text: "users", icon: <GroupAddIcon />, path: "/users" },
    { text: "pages", icon: <LayersIcon />, path: "/pages" },
    { text: "wikis", icon: <WebIcon />, path: "/wikis" },
    { text: "faqs", icon: <QuizIcon />, path: "/faqs" },
    {
      text: "destinations",
      icon: <EditLocationAltIcon />,
      path: "/destinations",
    },
    { text: "hotels", icon: <HotelIcon />, path: "/hotels" },
    { text: "packages", icon: <HouseboatIcon />, path: "/tours" },
    { text: "bookings", icon: <CalendarMonthIcon />, path: "/bookings" },
    { text: "reviews", icon: <ReviewsIcon />, path: "/reviews" },
    { text: "Messages", icon: <MailIcon />, path: "/messages" },
    { text: "Settings", icon: <InboxIcon />, path: "/settings" },
    { text: "Profile", icon: <MailIcon />, path: "/profile" },
  ];

  return (
    <Drawer
      variant="persistent"
      open={isDrowerOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar>
        <Link to="/" className="flex-1">
          <img
            className="mx-auto h-32 w-auto object-cover"
            src="/assets/logo.png"
            alt="LinkedIn"
          />
        </Link>
      </Toolbar>
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map(({ text, icon, path }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => navigate(path)}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
