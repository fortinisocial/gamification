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
    font-family: 'Roboto Mono', sans-serif;
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
    text-shadow: 1px 1px 10px rgba(0,0,0,0.1);
  }

  button {
    cursor: pointer;
  }

  ${
    '' /* :root {
    --bg-gradient: linear-gradient(
        252deg,
        rgba(69, 69, 69, 0.03) 0%,
        rgba(69, 69, 69, 0.03) 50%,
        rgba(47, 47, 47, 0.03) 50%,
        rgba(47, 47, 47, 0.03) 100%
      ),
      linear-gradient(
        335deg,
        rgba(66, 66, 66, 0.09) 0%,
        rgba(66, 66, 66, 0.09) 50%,
        rgba(188, 188, 188, 0.09) 50%,
        rgba(188, 188, 188, 0.09) 100%
      ),
      linear-gradient(
        223deg,
        rgba(194, 194, 194, 0.08) 0%,
        rgba(194, 194, 194, 0.08) 50%,
        rgba(0, 0, 0, 0.08) 50%,
        rgba(0, 0, 0, 0.08) 100%
      ),
      linear-gradient(
        82deg,
        rgba(27, 27, 27, 0.01) 0%,
        rgba(27, 27, 27, 0.01) 50%,
        rgba(197, 197, 197, 0.01) 50%,
        rgba(197, 197, 197, 0.01) 100%
      ),
      linear-gradient(
        281deg,
        rgba(3, 3, 3, 0.09) 0%,
        rgba(3, 3, 3, 0.09) 50%,
        rgba(198, 198, 198, 0.09) 50%,
        rgba(198, 198, 198, 0.09) 100%
      ),
      linear-gradient(
        319deg,
        rgba(47, 47, 47, 0.01) 0%,
        rgba(47, 47, 47, 0.01) 50%,
        rgba(89, 89, 89, 0.01) 50%,
        rgba(89, 89, 89, 0.01) 100%
      ),
      linear-gradient(
        278deg,
        rgba(243, 243, 243, 0.06) 0%,
        rgba(243, 243, 243, 0.06) 50%,
        rgba(63, 63, 63, 0.06) 50%,
        rgba(63, 63, 63, 0.06) 100%
      ),
      linear-gradient(
        38deg,
        rgba(81, 81, 81, 0.09) 0%,
        rgba(81, 81, 81, 0.09) 50%,
        rgba(201, 201, 201, 0.09) 50%,
        rgba(201, 201, 201, 0.09) 100%
      ),
      linear-gradient(
        33deg,
        rgba(168, 168, 168, 0.08) 0%,
        rgba(168, 168, 168, 0.08) 50%,
        rgba(129, 129, 129, 0.08) 50%,
        rgba(129, 129, 129, 0.08) 100%
      ),
      linear-gradient(0deg, #1b9efe, #46f3e7);
  } */
  }
`;
