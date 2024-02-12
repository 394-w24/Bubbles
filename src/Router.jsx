import { Routes, Route } from "react-router-dom";
import Scanner from "./Components/Scanner";
import PageNotFound from "./Components/PageNotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<Scanner />} />
      <Route path="/Scanner" element={<Scanner />} />
    </Routes>
  );
};

export default Router;
