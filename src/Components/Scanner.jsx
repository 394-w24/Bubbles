import Header from "./Header";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import "./Scanner.css";

const Scanner = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="scanner">
      <Header user={user} />
      <div
        className="scanner-default-link"
        onClick={() => navigate("/ScannerDefault")}
      >
        <span>Capture 1 Item for Instructions</span>
      </div>
      <div
        className="scanner-compatibility-link"
        onClick={() => navigate("/ScannerCompatibility")}
      >
        <span>Capture 2 Items for Compatibility</span>
      </div>
      <NavBar />
    </div>
  );
};

export default Scanner;
