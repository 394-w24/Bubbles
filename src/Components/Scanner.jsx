import { useNavigate } from "react-router-dom";
import "./Scanner.css";

const Scanner = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="scanner">
      <div
        className="scanner-default-link"
        data-cy="button1"
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
    </div>
  );
};

export default Scanner;
