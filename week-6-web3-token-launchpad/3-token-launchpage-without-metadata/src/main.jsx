import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import Provider from "./components/Provider.jsx";
import "./index.css";
// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider>
      <App />
    </Provider>
  </StrictMode>
);
