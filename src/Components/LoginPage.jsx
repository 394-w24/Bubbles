import "./LoginPage.css";
import { get, ref, child, set } from "firebase/database";
import { database, auth } from "../Utilities/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const signIn = () => {
  signInWithPopup(auth, new GoogleAuthProvider())
    .then((result) => {
      get(child(ref(database), `/users/${result.user.uid}`))
        .then((snapshot) => {
          if (!snapshot.exists()) {
            set(ref(database, "/users/" + result.user.uid), {
              username: result.user.displayName,
              email: result.user.email,
              profile_picture: result.user.photoURL,
            });
          }
        })
        .catch((error) =>
          console.error(`Error while signing in: ${error.message}`)
        );
    })
    .catch((error) => {
      alert(error.message);
    });
};

// const signIn = async () => {
//   await signInWithPopup(auth, new GoogleAuthProvider()).catch((e) => alert(e));
// };

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-page-logo">
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/d/d4/Northwestern_wildcats_CMKY_80_100_0_0.svg" /> */}
        <img src="/下载.jpeg" />
        <button type="submit" data-cy="signin" onClick={signIn}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
