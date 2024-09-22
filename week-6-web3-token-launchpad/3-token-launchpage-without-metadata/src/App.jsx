import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "./App.css";
import { TokenLaunchpad } from "./components/TokenLaunchpad";

function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        gap: 30,
        padding: 20,
        paddingBottom: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <WalletMultiButton />
        <WalletDisconnectButton />
      </div>

      <TokenLaunchpad />
    </div>
  );
}

export default App;
