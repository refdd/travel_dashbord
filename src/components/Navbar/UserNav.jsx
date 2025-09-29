import React from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";

function UserNav({ user, logout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box display="flex" alignItems="center">
      <h5 className="text-bsSuccess text-xl font-semibold mr-2">
        {user?.name || "Guest"}
      </h5>
      <IconButton onClick={handleMenuOpen} size="small">
        <Avatar>{user?.name?.charAt(0).toUpperCase()}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        PaperProps={{
          elevation: 2,
          sx: {
            mt: 1.5,
          },
        }}
      >
        <MenuItem onClick={() => console.log("Profile")}>Profile</MenuItem>
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

export default UserNav;
