import { Routes, Route } from "react-router-dom";
import Scanner from "./Components/Scanner";
import PageNotFound from "./Components/PageNotFound";
import Symbols from "./Components/Symbols";
import Help from "./Components/Help";

const Router = ({ user }) => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<Scanner user={user} />} />
      <Route path="/Scanner" element={<Scanner user={user} />} />
      <Route path="/Symbols" element={<Symbols user={user} />} />
      <Route path="/Help" element={<Help user={user} />} />
    </Routes>
  );
};

export default Router;
