import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StyleReset, ThemeProvider } from 'atomize';
import { BrowserRouter } from 'react-router-dom';
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

const debug = process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

const engine = new Styletron();

const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = {
  colors: {
    primary: 'tomato',
    accent: 'yellow',
  },
};

root.render(
  // <React.StrictMode>
    <StyletronProvider value={engine} debug={debug} debugAfterHydration>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <StyleReset />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </StyletronProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
