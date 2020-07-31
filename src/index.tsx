import React from 'react';
import ReactDOM from 'react-dom';
import Visualiser from './components/Visualiser';
import { GlobalStyle } from './styles/global';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Visualiser />
  </React.StrictMode>,
  document.getElementById('root')
);
