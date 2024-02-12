import Header from "./Header";
import NavBar from "./NavBar";
import "./Scanner.css";

const Scanner = () => {
  /* 
  TO-DO(Marvin): 
    1 - Upload Image button
    2 - Upload it to Firebase (wait for Murat to complete the Login Page)
  */
  /* After user uploads image, i.e. clicks on upload, we need to hard code translations and instructions*/

  return (
    <div className="scanner">
      <Header />
      <NavBar />
    </div>
  );
};

export default Scanner;
