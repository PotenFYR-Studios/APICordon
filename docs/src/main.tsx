import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// The build prerenders every route (scripts/prerender.tsx), so the shipped
// HTML already contains the full body; hydrate instead of re-rendering.
hydrateRoot(document.getElementById("root")!, (
  <StrictMode>
    <App />
  </StrictMode>
));
