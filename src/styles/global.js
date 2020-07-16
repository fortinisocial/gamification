import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html {
    width: 100%;
    min-height: 100%;
  }

  body {
    background-image: linear-gradient(
      to right bottom,
      #01afb2,
      #00adbe,
      #00aac8,
      #00a6d1,
      #1ca2d7
    );
    color: #fff;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    min-height: 100%;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Bangers', sans-serif;
    font-weight: 400;
    letter-spacing: 1px;
  }

  button {
    cursor: pointer;
  }
`;
