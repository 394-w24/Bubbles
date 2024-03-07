import React, { useState } from "react";
import "./Symbols.css";
import "./Translations.css";
import Header from "./Header";
import NavBar from "./NavBar";
import SymbolList from "./SymbolList";
import data from "../../data/symbol.json";

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const thereExistsSelection = (selections) =>
  Object.entries(selections).some(([, symbolId]) => symbolId !== null);

const Translations = ({ selections, data }) => {
  const selectedSymbols = Object.entries(selections)
    .filter(([, symbolId]) => symbolId !== null)
    .map(([header, symbolId]) =>
      data[header].find((symbol) => symbol.id === symbolId)
    );

  return (
    <ul>
      {selectedSymbols.map((symbol) => (
        <li key={symbol.id}>
          <img src={symbol.url} alt={symbol.alt} />
          {symbol.translation}
        </li>
      ))}
    </ul>
  );
};

const Symbols = ({ user }) => {
  const [selections, setSelections] = useState({});

  return (
    <div className="symbols">
      <div className="symbols-content">
        <div className="translations">
          <h3>Translations</h3>
          {thereExistsSelection(selections) && (
            <Translations data={data} selections={selections} />
          )}
        </div>
        <div className="symbols-cards">
          {Object.entries(data).map(([header, symbols]) => (
            <div className="symbols-section" key={header}>
              <h4>
                {header === "professionalCleaning"
                  ? "Professional Cleaning"
                  : capitalizeFirstLetter(header)}
              </h4>
              <SymbolList
                symbols={symbols}
                header={header}
                selectedSymbolId={selections[header]}
                setSelectedSymbols={setSelections}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Symbols;
