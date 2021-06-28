import "../globals.ts";
import "./Global.styles.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// alert("i am ready");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
