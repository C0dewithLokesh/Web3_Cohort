import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import Airdrop from "./components/Airdrop";

function App() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [walletBalance, setWalletBalance] = useState<string | number>("");

  const getWalletBalance = async () => {
    if (wallet?.publicKey) {
      console.log(123);
      const balance = await connection.getBalance(wallet.publicKey);
      setWalletBalance(balance);
    }
  };
  console.log(23);
  useEffect(() => {
    getWalletBalance();
  }, []);

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
      <p className="text-xl">
        Wallet Balance:{" "}
        <span className="text-[#512da8] font-medium">{walletBalance}</span>
      </p>
      <Airdrop />
    </div>
  );
}

export default App;
