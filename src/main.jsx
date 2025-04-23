import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");

// Protect from re-creating root during HMR
if (!container._root) {
  container._root = ReactDOM.createRoot(container);
}

container._root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
