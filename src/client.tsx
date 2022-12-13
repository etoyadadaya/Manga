import React from "react";
import App from "./app";
import "./common/styles.scss";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import Firebase from "./contexts/firebaseContext";

createRoot(document.getElementById("app")).render(
  <BrowserRouter>
    <Firebase>
      <App />
    </Firebase>
  </BrowserRouter>
);
