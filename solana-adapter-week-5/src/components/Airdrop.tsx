import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

const Airdrop = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");

  const requestAirDropHandler = async () => {
    if (!amount) alert("Add some SOL first");
    try {
      if (wallet?.publicKey) {
        await connection.requestAirdrop(wallet.publicKey, +amount! * 10 ** 9);
        setAmount("");
        alert("Airdrop Done");
      } else {
        console.error("Connect Wallet");
      }
    } catch (error: any) {
      alert(
        "You've either reached your airdrop limit today or the airdrop faucet has run dry. Please visit the Solana faucet for alternate sources of test SOL."
      );
    }
  };

  return (
    <div className="flex items-center gap-5">
      <input
        value={amount}
        type="number"
        max={10}
        placeholder="Amount"
        className="border border-gray-400 p-1 rounded-xl"
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <button
        onClick={requestAirDropHandler}
        className="border p-2 rounded-xl cursor-pointer"
      >
        Request Airdrop
      </button>
    </div>
  );
};

export default Airdrop;
