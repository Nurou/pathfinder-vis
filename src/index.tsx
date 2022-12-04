import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './styles/global';

const GlobalStyleProxy: any = GlobalStyle;

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <GlobalStyleProxy />
      <App />
    </React.StrictMode>
  );
}
