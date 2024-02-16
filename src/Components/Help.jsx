import NavBar from "./NavBar";
import Header from "./Header";
import DummyInstructionsGeneral from "./DummyInstructionsGeneral";
import "./Help.css";

const Help = ({ user }) => {
  return (
    <div className="help">
      <Header user={user} />
      <div className="help-content">
        <DummyInstructionsGeneral />
      </div>
      <NavBar />
    </div>
  );
};

export default Help;
