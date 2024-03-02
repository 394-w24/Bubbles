import Header from "./Header";
import NavBar from "./NavBar";
import "./Scanner.css";

const ScannerCompatibility = ({ user }) => {
  return (
    <div className="scanner">
      <Header user={user} />
      This is the ScannerCompatibility Component
      <NavBar />
    </div>
  );
};

export default ScannerCompatibility;
