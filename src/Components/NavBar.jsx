import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InterestsIcon from "@mui/icons-material/Interests";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined"; // Changed to CameraAltOutlinedIcon
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
        <button onClick={() => navigate("/Symbols")}>
          <InterestsIcon color={isActive("/Symbols") ? "primary" : "action"} />
        </button>
        <span>SYMBOLS</span>
      </div>
      <div className={`nav-item ${isActive("/Scanner") ? "active" : ""}`}>
        <button onClick={() => navigate("/Scanner")}>
          <CameraAltOutlinedIcon
            color={isActive("/Scanner") | isActive("/") ? "primary" : "action"}
          />{" "}
          {/* Used CameraAltOutlinedIcon */}
        </button>
        <span>SCANNER</span>
      </div>
    </footer>
  );
};

export default NavBar;
