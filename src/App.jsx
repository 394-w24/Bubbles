import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Scanner from "./Components/Scanner";
// Camel case yourName for js and jsx
// Kebab case for css ex: app-content
// Component naming camelCase but first name capital like: AppContent

/*
  Jason: Using Bootstrap for styling
*/

/*
  Murat: Login Page, Navbar, Header, Router
*/

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Scanner />
    </div>
  );
};

export default App;
