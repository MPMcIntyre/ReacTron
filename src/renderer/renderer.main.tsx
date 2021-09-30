import React from "react";
import ReactDOM from "react-dom";
import "./Global.styles.scss";
import App from "./App";

const relativePath = "./fonts/";

// *Insert any local fonts here
let fonts: any = { Questrial: "ttf" };

// Add fonts to the document
async function loadFonts() {
  if (fonts) {
    let fontArr = Object.keys(fonts);
    await fontArr.forEach((font: string) => {
      loadSingleFont(font, fonts[font]);
    });
    document.body.classList.add("fonts-loaded");
  }

  async function loadSingleFont(font: string, type: string) {
    const fontFace = new FontFace(font, `url(${relativePath}${font}.${type})`);
    await fontFace.load();
    await document.fonts.add(fontFace);
  }
}

// * Once fonts have loaded, React will render the page
loadFonts().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
