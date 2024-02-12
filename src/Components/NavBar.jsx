import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <footer className="nav-bar">
      <div className="all-symbols-nav">
        <button onClick={() => navigate("/Symbols")}>
          Can add an icon here
        </button>
        <span>SYMBOLS</span>
      </div>
      <div className="scanner-nav">
        <button onClick={() => navigate("/Scanner")}>
          Can add an icon here{" "}
        </button>
        <span>SCANNER</span>
      </div>
      <div className="help-nav">
        <button onClick={() => navigate("/Help")}>Can add an icon here </button>
        <span>HELP</span>
      </div>
    </footer>
  );
};

export default NavBar;
