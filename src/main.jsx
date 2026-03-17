import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";

const container = document.getElementById("root");

// Protect from re-creating root during HMR
if (!container._root) {
  container._root = ReactDOM.createRoot(container);
}

container._root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
);
