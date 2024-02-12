import { firebaseSignOut } from "../Utilities/firebase";
import "./Header.css";

const Header = ({ user }) => {
  return (
    <header className="header">
      <div className="header-sign-out">
        <button onClick={firebaseSignOut}>Sign Out</button>
      </div>
      <div className="header-title">
        <h2>Bubbles</h2>
      </div>
      <div className="header-user-avatar">
        <img src={user.profile_picture} />
      </div>
    </header>
  );
};

export default Header;
