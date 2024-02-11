// Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update, get } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { useState, useEffect, useCallback } from "react";

import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApxhsea_WmX8nFSK7zMuut4S27u8Os914",
  authDomain: "cs394fitnessapp.firebaseapp.com",
  databaseURL: "https://cs394fitnessapp-default-rtdb.firebaseio.com",
  projectId: "cs394fitnessapp",
  storageBucket: "cs394fitnessapp.appspot.com",
  messagingSenderId: "279762030876",
  appId: "1:279762030876:web:94a6fa40e0ec130e41aad9",
  measurementId: "G-X5FV6V3H9T",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(firebase);

export const signInWithGoogle = () =>
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());

const firebaseSignOut = () => {
  signOut(getAuth(firebase));
};

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(firebase), setUser), []);

  return [user];
};

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const removeListener = onValue(
      ref(database, path),
      (snapshot) => {
        setData(snapshot.val());
      },
      (error) => {
        setError(error);
      }
    );
    return () => removeListener();
  }, [path]);

  return [data, error];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};
