import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #2a4365;
    font-family: 'Work Sans', sans-serif;
    margin: 0;
  }

  .start{
    background-color: blue;
  }

  .end{
    background-color: red;
  }

  .regular {
    background-color: rgba(169, 158, 147);
  }

  .wall {
    background-color: lightgray;
  }
  .grass {
    background-color: green;
  }

`;