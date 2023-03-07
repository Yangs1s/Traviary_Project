/** @format */

import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}

:root {
  /* Color styles */

--main-bgcolor: #fff;
--main-color: #FFF7F2;

--tab-bgcolor:linear-gradient(#ff0063, #c71967);
--tab-color: #29141A;

--color-gray0: #c9c9c9;
--color-gray1: #aaaaaa;
--color-gray2: #7d7d7d;
--color-gray3: #515151;
--base-size: 10px;
--font-main: "Gill Sans", sans-serif;
--font-lobster:Lobster;
--kor-font: 'Dongle', sans-serif;

}
html {
  font-size: var(--base-size);
}
*,
*::before,
*::after {
  box-sizing: border-box;
  list-style: none;
  margin:0;
  padding:0;
}
body {
  font: 1.6rem/1.15 var(--font-family-lato);
  width: 100%;
  color: var(--color-black);
  background: var(--color-white);
}
a,
a::before,
a::before {
  color: inherit;
  text-decoration: none;
}
a img {
  vertical-align: middle;
}
button {
  font-size: inherit;
  cursor: pointer;
}
button:disabled {
  cursor: not-allowed;
}
li {
  list-style: none;
}
&::-webkit-scrollbar {
    width: 1px;
  }
`;

export default GlobalStyle;
