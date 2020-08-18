import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`


  body {
    background-color: #2a4365;
    font-family: 'Orbitron', sans-serif;
    margin: 0;
  }

  pre {
    color: white;
  }

  .start{
    background-color: hsl(0, 11%, 88%);

  }

  .end{
    background-color: hsl(0, 11%, 88%);

  }

  .regular {
    background-color: hsl(0, 11%, 88%);
  }

  .wall {
    background-color: hsl(60, 5%, 50%);
  }

  .grass {
    background-color: hsl(111, 20%, 60%);
  }


.node-visited {
  animation-name: visitedAnimation;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

@keyframes visitedAnimation {
  0% {
    transform: scale(0.6);
  }

  50% {
    transform: scale(0.8);

  }

  100% {
    transform: scale(1);
    background-color: hsl(30, 20%, 75%);
  }
}

.node-shortest-path {
  animation-name: shortestPath;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-delay: 0;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-play-state: running;
}

@keyframes shortestPath {
  0% {
    background-color: hsl(0, 0%, 96%);

  }

  50% {
  }

  100% {
    background-color: hsl(51, 100%, 50%);
  }

}

`;
