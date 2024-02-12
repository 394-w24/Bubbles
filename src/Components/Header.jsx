import { firebaseSignOut } from "../Utilities/firebase";
const Header = () => {
  return (
    <header className="header">
      <div className="header-sign-out">
        <button onClick={firebaseSignOut}>Sign Out</button>
      </div>
      <div className="header-title">
        <h2>Bubbles</h2>
      </div>
      <div className="header-user-avatar">
        <img />
      </div>
    </header>
  );
};

export default Header;
