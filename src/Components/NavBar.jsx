import "./Navbar.css";

const NavBar = () => {
  return (
    <footer className="nav-bar">
      <div className="all-symbols-nav">
        <button>Can add an icon here </button>
        <span>SYMBOLS</span>
      </div>
      <div className="scanner-nav">
        <button>Can add an icon here </button>
        <span>SCANNER</span>
      </div>
      <div className="help-nav">
        <button>Can add an icon here </button>
        <span>HELP</span>
      </div>
    </footer>
  );
};

export default NavBar;
