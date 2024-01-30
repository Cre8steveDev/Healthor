// eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import StateProvider from "./components/StateProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StateProvider>
    <App />
  </StateProvider>
);
