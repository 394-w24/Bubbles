import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined"; // Changed to CameraAltOutlinedIcon
import HelpIcon from "@mui/icons-material/Help";
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
          <HomeIcon color={isActive("/Symbols") ? "primary" : "action"} />
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
      <div className={`nav-item ${isActive("/Help") ? "active" : ""}`}>
        <button onClick={() => navigate("/Help")}>
          <HelpIcon color={isActive("/Help") ? "primary" : "action"} />
        </button>
        <span>HELP</span>
      </div>
    </footer>
  );
};

export default NavBar;