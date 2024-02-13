import React from 'react';
import { firebaseSignOut } from "../Utilities/firebase";
import IconButton from '@mui/material/IconButton'; // Import the IconButton component
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'; // Import the logout icon
import "./Header.css";

const Header = ({ user }) => {
  return (
    <header className="header">
      <div className="header-sign-out">
        {/* Use IconButton for an icon-only button */}
        <IconButton 
          color="inherit" 
          onClick={firebaseSignOut}
          aria-label="sign out"
        >
          <LogoutOutlinedIcon />
        </IconButton>
      </div>
      <div className="header-title">
        <h2>Bubbles</h2>
      </div>
      <div className="header-user-avatar">
        <img src={user.profile_picture} alt="User Avatar" />
      </div>
    </header>
  );
};

export default Header;
