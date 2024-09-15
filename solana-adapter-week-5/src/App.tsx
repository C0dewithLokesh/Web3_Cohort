import {
  WalletDisconnectButton,
  WalletMultiButton
} from "@solana/wallet-adapter-react-ui";

function App() {
  return (
    <div>
      <div>
        <WalletMultiButton
          style={{
            backgroundColor: "",
            height: "40px",
            borderRadius: "8px",
          }}
        />
        <WalletDisconnectButton />
      </div>
      {/* <Airdrop /> */}
    </div>
  );
}

export default App;
