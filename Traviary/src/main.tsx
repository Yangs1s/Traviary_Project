/** @format */

import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/font/font.css";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
