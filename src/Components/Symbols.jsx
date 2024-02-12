/* 
Jason: Just display an image of all symbol if time exists
*/
import Header from "./Header";
import NavBar from "./NavBar";
import DummyTranslations from "./DummyTranslation";
import DummyInstructions from "./DummyInstructions";

const Symbols = ({ user }) => {
  return (
    <div className="symbols">
      <Header user={user} />
      <DummyTranslations />
      <DummyInstructions />
      <NavBar />
    </div>
  );
};

export default Symbols;
