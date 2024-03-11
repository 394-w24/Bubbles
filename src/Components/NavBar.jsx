import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InterestsIcon from "@mui/icons-material/Interests";
import HomeIcon from "@mui/icons-material/Home"; // Changed to CameraAltOutlinedIcon
import "./Navbar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location

  // Function to check if the path is the current location
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <footer className="nav-bar">
      <div className={`nav-item ${isActive("/Symbols") ? "active" : ""}`}>
        <button className="nav-button" onClick={() => navigate("/Symbols")}>
          <InterestsIcon color={isActive("/Symbols") ? "primary" : "action"} />
          <span>SYMBOLS</span>
        </button>
      </div>
      <div className={`nav-item ${isActive("/Scanner") ? "active" : ""}`}>
        <button className="nav-button" onClick={() => navigate("/Scanner")}>
          <HomeIcon
            color={isActive("/Scanner") | isActive("/") ? "primary" : "action"}
          />
          <span>HOME</span>
        </button>
      </div>
    </footer>
  );
};

export default NavBar;
