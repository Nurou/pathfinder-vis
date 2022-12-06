import { createGlobalStyle } from 'styled-components';
// import space mono from font source

export const GlobalStyle = createGlobalStyle`
  .regular, .start, .end {
    background-color: #E5E9F0;
  } 

  .wall {
    background-color: #4C566A;
  }

  .grass {
    background-color: #8FBCBB;
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
    background-color: #D8DEE9;
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
  box-shadow: none;
  }

 

  100% {
    box-shadow: 0 0 0 4px #2E3440;
  }

}

`;
