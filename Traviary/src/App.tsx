/** @format */

import GlobalStyle from "../public/assets/Globalstyles"; // 이건 베포때문에 건드리지 말것
import Router from "./router/Router";
import "./App.css";
function App() {
  return (
    <main className="App">
      <GlobalStyle />
      <Router />
    </main>
  );
}

export default App;
