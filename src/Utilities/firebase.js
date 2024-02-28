// Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, update } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { useState, useEffect, useCallback } from "react";

import { getStorage } from "firebase/storage";

import * as cors from "cors";

import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5RqjQTkkCE9ziICzevj2b1kBowDA7u9E",
  authDomain: "bubbles-7ba5c.firebaseapp.com",
  databaseURL: "https://bubbles-7ba5c-default-rtdb.firebaseio.com",
  projectId: "bubbles-7ba5c",
  storageBucket: "bubbles-7ba5c.appspot.com",
  messagingSenderId: "560959266079",
  appId: "1:560959266079:web:a9a0ea5c132c565246a42a",
  measurementId: "G-G9MM5BMB2W",
};
// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

// firebase.use(cors);


export const auth = getAuth(firebase);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(firebase);

export const signInWithGoogle = () =>
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());

export const firebaseSignOut = () => {
  signOut(getAuth(firebase));
};

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

export const storage = getStorage(firebase);
