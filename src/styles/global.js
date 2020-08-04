import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #2a4365;
    font-family: 'Work Sans', sans-serif;
    margin: 0;
  }

  pre {
    color: white;
  }

  .start{
    /* background-color: blue; */
    background-color: rgba(169, 158, 147);

  }

  .end{
    background-color: red;
  }

  .regular {
    background-color: rgba(169, 158, 147);
  }

  .wall {
    background-color: #868678;
  }
  .grass {
    background-color: green;
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
    border-radius: 100%;
  }

  50% {
  }

  75% {
  }

  100% {
    background-color: rgba(61, 133, 161, 1);
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
    transform: scale(0.6);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    background-color: rgb(165, 114, 64);
    transform: scale(1);
  }
}



`;
