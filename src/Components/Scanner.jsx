import Header from "./Header";
import NavBar from "./NavBar";
import "./Scanner.css";

const Scanner = ({ user }) => {
  /* 
  TO-DO(Marvin): 
    1 - Upload Image button
    2 - Upload it to Firebase 
  */
  /* After user uploads image, i.e. clicks on upload, we need to hard code translations and instructions */

  return (
    <div className="scanner">
      <Header user={user} />
      <NavBar />
    </div>
  );
};

export default Scanner;
