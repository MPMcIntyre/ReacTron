import "./Global.styles.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import BTon from "./SimpleButton";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <BTon hello={"Helloo"} />
  </React.StrictMode>,
  document.getElementById("root")
);
