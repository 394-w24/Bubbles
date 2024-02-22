// import { useState } from "react";
// import Header from "./Header";
// import NavBar from "./NavBar";
// import SymbolList from "./SymbolList";
// import "./Symbols.css";
// import data from '../../data/symbol.json';


// const capitalizeFirstLetter = (string) =>
//   string.charAt(0).toUpperCase() + string.slice(1);

// const Symbols = ({ user }) => {
//   const sections = {
//     washing: [
//       { url: "/0.svg", id: 0, alt: "A washer symbol" },
//       { url: "/wash_below_30.jpeg", id: 1, alt: "A washer Symbol" },
//     ],
//     bleaching: [
//       { url: "/tumble_dry.png", id: 0, alt: "A dryer symbol" },
//       { url: "/bleach_all_allow.png", id: 1, alt: "A dryer symbol" },
//     ],
//   };
//   const [selections, setSelections] = useState({ washing: null, drying: null });

//   return (
//     <div className="symbols">
//       <Header user={user} />
//       <div className="symbols-cards">
//         {Object.entries(sections).map(([header, symbols]) => (
//           <div className="symbols-section" key={header}>
//             <h4>{capitalizeFirstLetter(header)}</h4>
//             <SymbolList
//               symbols={symbols}
//               header={header}
//               selectedSymbolId={selections[header]}
//               setSelectedSymbols={setSelections}
//             />
//           </div>
//         ))}
//       </div>
//       <NavBar />
//     </div>
//   );
// };

// export default Symbols;

import React, { useState } from 'react';
import Header from "./Header";
import NavBar from "./NavBar";
import SymbolList from "./SymbolList";
import data from '../../data/symbol.json'; 
import "./Symbols.css";

const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const Symbols = ({ user }) => {
  const [selections, setSelections] = useState({
    washing: null,
    bleaching: null,
    drying: null,
    ironing: null,
    professionalCleaning: null,
  });

  const handleSelectionChange = (category, id) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [category]: id,
    }));
  };

  return (
    <div className="symbols">
      <Header user={user} />
      <div className="symbols-cards">
        {Object.entries(data).map(([category, symbols]) => (
          <div className="symbols-section" key={category}>
            <h4>{capitalizeFirstLetter(category)}</h4>
            <SymbolList
              symbols={symbols}
              category={category} 
              selectedSymbolId={selections[category]} 
              onSelectionChange={handleSelectionChange} 
            />
          </div>
        ))}
      </div>
      <NavBar />
    </div>
  );
};

export default Symbols;
