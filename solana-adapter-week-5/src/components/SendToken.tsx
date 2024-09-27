import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";

const SendToken = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [formData, setFormData] = useState<{
    amount: string;
    to: string;
  }>({
    amount: "",
    to: "",
  });

  const handleChange = (key: keyof typeof formData, value: string) => {
    setFormData((prevData) => ({ ...prevData, [key]: value }));
  };

  const sendToken = async () => {
    if (!publicKey) {
      alert("Please connect your wallet.");
      return;
    }

    try {
      const recipientPubkey = new PublicKey(formData.to);
      const amountInLamports = parseFloat(formData.amount) * LAMPORTS_PER_SOL;

      if (isNaN(amountInLamports) || amountInLamports <= 0) {
        alert("Invalid amount entered.");
        return;
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubkey,
          lamports: amountInLamports,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      // Send transaction
      const response = await sendTransaction(transaction, connection);

      alert(`Transaction Sent: ${response}`);
      setFormData({
        amount: "",
        to: "",
      });
    } catch (error) {
      console.error("Error sending transaction:", error);
      alert("Invalid recipient public key.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-[400px]">
      <h1 className="text-black text-2xl font-semibold">Send Token</h1>
      <div className="flex flex-col items-center gap-3 w-full">
        <input
          value={formData.to}
          type="text"
          placeholder="Receiver Public Key"
          className="border border-gray-400 p-1 rounded-xl w-full"
          onChange={(e) => handleChange("to", e.currentTarget.value)}
        />
        <input
          value={formData.amount}
          type="number"
          placeholder="Amount (SOL)"
          className="border border-gray-400 p-1 rounded-xl w-full"
          onChange={(e) => handleChange("amount", e.currentTarget.value)}
        />
      </div>
      <button
        onClick={sendToken}
        className="border p-2 rounded-xl cursor-pointer"
      >
        Send Tokens
      </button>
    </div>
  );
};

export default SendToken;
