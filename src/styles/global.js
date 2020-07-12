import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #023839;
    color: #FFF;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Bangers', sans-serif;
    font-weight: 400;
    letter-spacing: 1px;
  }

  header {
    font-family: 'Bangers', sans-serif;
    font-weight: 400;
    font-size: 2.5vw;
  }

  button {
    cursor: pointer;
  }
`;
