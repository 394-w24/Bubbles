import NavBar from "./NavBar";
import Header from "./Header";
import "./Help.css";

const Help = ({ user }) => {
  return (
    <div className="help">
      <Header user={user} />
      <NavBar />
    </div>
  );
};

export default Help;
