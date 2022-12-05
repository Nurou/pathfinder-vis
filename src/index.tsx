import '@fontsource/space-mono';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './styles/global';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <GlobalStyle />
      <App />
    </React.StrictMode>
  );
}
