import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    list-style: none;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* vertical-align: bottom; */
    text-decoration: none;
    box-sizing: border-box;
  }
  html,
  body {
    height: 100%;
    width: 100%;
    background-color: #fff;
    /* position: relative !important; */
  }
  img {
    width: 100%;
    height: 100%;
  }
  p {
    margin: 0;
    padding: 0;
  }
  /* h1 {
    font-size: 40px;
    @media screen and (max-width: 960px) {
      font-size: 36px;
    }
  } */
`;

export default GlobalStyle;
