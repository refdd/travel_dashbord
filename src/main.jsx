// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import StreamVideoProvider from "./context/StreamVideoProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StreamVideoProvider>
      <App />
    </StreamVideoProvider>
  </React.StrictMode>
);
