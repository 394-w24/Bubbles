import { Routes, Route } from "react-router-dom";
import Scanner from "./Components/Scanner";
import ScannerDefault from "./Components/ScannerDefault";
import ScannerCompatibility from "./Components/ScannerCompatibility";
import PageNotFound from "./Components/PageNotFound";
import Symbols from "./Components/Symbols";

const Router = ({ user }) => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<Scanner user={user} />} />
      <Route path="/Scanner" element={<Scanner user={user} />} />
      <Route path="/ScannerDefault" element={<ScannerDefault user={user} />} />
      <Route
        path="/ScannerCompatibility"
        element={<ScannerCompatibility user={user} />}
      />
      <Route path="/Symbols" element={<Symbols user={user} />} />
    </Routes>
  );
};

export default Router;
