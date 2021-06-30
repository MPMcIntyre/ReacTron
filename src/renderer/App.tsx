// import react from "react";
import React from "react";

console.log("This tests sourcemap");

let openURL = window.mainApi.openExternal;

declare const window: any;
const styles = {
  logo: {
    width: "50%",
  },
  buttonGrid: {
    display: "grid",
    padding: "2rem",
    gap: "1rem",
    gridTemplateColumns: "repeat(2, 1fr)",
    alignItems: "center",
  },
  button: {
    margin: "auto",
    width: "100%",
    height: "4rem",

    fontSize: "1rem",
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
      <img src={imagePath} alt="Reactron logo" style={styles.logo} />

      <p>Make Electron-React app devlopment simple</p>
      <div style={styles.buttonGrid}>
        <button
          style={styles.button}
          onClick={() => {
            openURL("https://github.com/MPMcIntyre/ReacTron");
          }}>
          Documentation 👀
        </button>
        <button
          style={styles.button}
          onClick={() => {
            openURL("https://github.com/MPMcIntyre/ReacTron");
          }}>
          Donate 💖
        </button>
        <button
          style={styles.button}
          onClick={() => {
            openURL("https://github.com/MPMcIntyre/ReacTron/issues");
          }}>
          Issues 🤔
        </button>
        <button
          style={styles.button}
          onClick={() => {
            openURL("https://github.com/MPMcIntyre/ReacTron");
          }}>
          Forum 👨‍👩‍👧‍👦
        </button>
      </div>
      <h1>
        Brought to you by{" "}
        <span
          className="altInno"
          onClick={() => {
            openURL("http://www.alt-innovations.com");
          }}>
          Alt-Innovations
        </span>
      </h1>
    </div>
  );
}

export default App;
