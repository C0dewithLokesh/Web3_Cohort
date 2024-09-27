import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { useState } from "react";

const SignMessage = () => {
  const [message, setMessage] = useState("");
  const { publicKey, signMessage } = useWallet();

  const onClick = async () => {
    if (!publicKey) alert("Wallet not Connected");
    if (!signMessage) alert("Wallet does not support message signing");
    if (!message) alert("Add message first");

    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage!(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey?.toBytes()!))
      alert("Message Signature Invalid");

    alert(`Message Signature: ${bs58.encode(signature)}`);
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-[400px]">
      <h1 className="text-black text-2xl font-semibold">Sign Message</h1>
      <div className="flex flex-col items-center gap-3 w-full">
        <input
          value={message}
          type="text"
          placeholder="message"
          className="border border-gray-400 p-1 rounded-xl w-full"
          onChange={(e) => setMessage(e.currentTarget.value)}
        />
      </div>
      <button
        onClick={onClick}
        className="border p-2 rounded-xl cursor-pointer"
      >
        Sign Message
      </button>
    </div>
  );
};

export default SignMessage;
