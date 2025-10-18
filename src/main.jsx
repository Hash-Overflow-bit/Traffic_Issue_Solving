import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App.jsx";
import AnimatedBg from "./componenets/AnimatedBg.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="container">
      <AnimatedBg />
      <App />
    </div>
  </StrictMode>
);
