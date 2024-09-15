import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import Airdrop from "./components/Airdrop";

function App() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center w-full justify-between p-5">
        <WalletMultiButton
          style={{
            backgroundColor: "",
            height: "40px",
            borderRadius: "8px",
          }}
        />
        <WalletDisconnectButton />
      </div>
      <Airdrop />
    </div>
  );
}

export default App;
