import "./App.css";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import { useAuthState, useDbData } from "./Utilities/firebase";
import LoginPage from "./Components/LoginPage";
import Loading from "./Components/Loading";
// Camel case yourName for js and jsx
// Kebab case for css ex: app-content
// Component naming camelCase but first letter capital like: AppContent

const App = () => {
  const [user] = useAuthState();
  const [userData, userDataError] = useDbData(`/users/${user?.uid}`);

  return (
    <div className="app">
      {user ? (
        userData ? (
          <BrowserRouter>
            <Router user={userData} />
          </BrowserRouter>
        ) : (
          <Loading />
        )
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default App;
