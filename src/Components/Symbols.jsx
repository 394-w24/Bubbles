import Header from "./Header";
import NavBar from "./NavBar";
import SymbolList from "./SymbolList";
import "./Symbols.css";

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const Symbols = ({ user }) => {
  const sections = {
    washing: [
      { url: "/wash_at_or_below_40.png", id: 0, alt: "A washer symbol" },
      { url: "/wash_below_30.jpeg", id: 1, alt: "A washer Symbol" },
    ],
    drying: [
      { url: "/tumble_dry.png", id: 0, alt: "A dryer symbol" },
      { url: "/bleach_all_allow.png", id: 1, alt: "A dryer symbol" },
    ],
  };

  return (
    <div className="symbols">
      <Header user={user} />
      <div className="symbols-cards">
        {Object.entries(sections).map(([header, symbols]) => (
          <div className="symbols-section">
            <h4>{capitalizeFirstLetter(header)}</h4>
            <SymbolList symbols={symbols} />
          </div>
        ))}
      </div>
      <NavBar />
    </div>
  );
};

export default Symbols;
