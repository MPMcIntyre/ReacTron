// import react from "react";
import React from "react";

declare const window: any;
const styles = {
  center: {
    textAlign: "center",
  },
};

let imagePath: string;
if (window.GlobalApi.isDev) {
  imagePath = "./assets/ReacTron.png";
} else {
  imagePath = "./assets/ReacTron.png";
}

function App() {
  console.log(document.getElementsByName("body"));
  return (
    <div className="container">
      <img src={imagePath} alt="Reactron logo" />
      <h1>ReacTron</h1>
    </div>
  );
}

export default App;
