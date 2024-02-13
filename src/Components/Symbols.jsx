/* 
Jason: Just display an image of all symbol if time exists
*/
import Header from "./Header";
import NavBar from "./NavBar";
import DummyTranslations from "./DummyTranslation";
import DummyInstructions from "./DummyInstructions";
import "./Symbols.css";

const Symbols = ({ user }) => {
  return (
    <div className="symbols">
      <Header user={user} />
      <NavBar />
    </div>
  );
};

export default Symbols;
