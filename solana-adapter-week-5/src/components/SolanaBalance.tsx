import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

const SolanaBalance = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [walletBalance, setWalletBalance] = useState<string | number>("");

  const getWalletBalance = async () => {
    if (wallet?.publicKey) {
      const balance = await connection.getBalance(wallet.publicKey);
      setWalletBalance(balance / LAMPORTS_PER_SOL);
    }
  };

  useEffect(() => {
    getWalletBalance();
  }, []);

  return (
    <p className="text-xl">
      Wallet Balance:{" "}
      {walletBalance ? (
        <span className="text-[#512da8] font-medium">{walletBalance} SOL</span>
      ) : (
        "Loading..."
      )}
    </p>
  );
};

export default SolanaBalance;
