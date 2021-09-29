declare const window: any;
let openURL = (URL: string) => {
  window.GlobalApi.invoke("openURL", URL);
};

let logoImgPath: string = "./assets/images/ReacTron.png";
let gitHubImgPath: string = "./assets/images/github.png";

export default function App() {
  return (
    <div className="container">
      <img src={logoImgPath} alt="Reactron logo" className="logo" />
      <p>Make Electron-React app devlopment simple</p>
      <div className="buttonGrid">
        <button
          className="button"
          onMouseEnter={(e) => {
            console.log(e);
          }}
          onClick={() => {
            console.log("documentation");
            openURL("https://github.com/MPMcIntyre/ReacTron#readme");
          }}>
          Documentation 👀
        </button>
        <button
          className="button"
          onClick={() => {
            openURL("https://github.com/MPMcIntyre/ReacTron/issues");
          }}>
          Issues 🤔
        </button>
        <button
          className="button"
          onClick={() => {
            openURL("https://github.com/sponsors/MPMcIntyre");
          }}>
          <span>Become a sponsor</span>
          <img className="github" src={gitHubImgPath} />
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
