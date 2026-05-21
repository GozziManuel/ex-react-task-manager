import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// css bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import * as bootstrap from "bootstrap";

// my CSS
import "./css/index.css";

// Javascript
import App from "./App.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
