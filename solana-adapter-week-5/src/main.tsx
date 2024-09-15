import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import "@solana/wallet-adapter-react-ui/styles.css";
import AppWalletProvider from "./provider/AppWalletProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWalletProvider>
      <App />
    </AppWalletProvider>
  </StrictMode>
);
