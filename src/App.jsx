import "./App.css";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { useAuthState } from "./Utilities/firebase";
import LoginPage from "./Components/LoginPage";

// Camel case yourName for js and jsx
// Kebab case for css ex: app-content
// Component naming camelCase but first letter capital like: AppContent

/*
  Jason: Using Bootstrap for styling
*/

/*
  Murat: Login Page, Navbar, Header, Router
*/

const App = () => {
  const [user] = useAuthState();
  // const user = undefined;

  return user ? (
    <div className="app">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  ) : (
    <LoginPage />
  );
};

export default App;
