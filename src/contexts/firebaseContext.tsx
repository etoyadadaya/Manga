import React, {createContext, FC, HTMLProps} from "react";

import {Auth, getAuth} from "firebase/auth";
import {Firestore, getFirestore} from "firebase/firestore";
import {FirebaseApp, initializeApp} from "firebase/app";

export const firebaseContext = createContext<{
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
}>(null);

type IFirebaseProps = HTMLProps<HTMLElement>;

const Firebase: FC<IFirebaseProps> = ({children}) => {
  const app = initializeApp({
    apiKey: "AIzaSyCP7x2u1LwxAUVX09HGZm7V8Koq4R1pq4Y",
    authDomain: "manga-cae6e.firebaseapp.com",
    projectId: "manga-cae6e",
    storageBucket: "manga-cae6e.appspot.com",
    messagingSenderId: "800780035279",
    appId: "1:800780035279:web:acad513f7d6a6a2232c3ba",
    measurementId: "G-N5H4Z9HPZC",
  });

  const auth = getAuth(app);
  const db = getFirestore(app);

  return (
    <firebaseContext.Provider
      value={{
        app,
        auth,
        db,
      }}
    >
      {children}
    </firebaseContext.Provider>
  );
};

export default Firebase;
