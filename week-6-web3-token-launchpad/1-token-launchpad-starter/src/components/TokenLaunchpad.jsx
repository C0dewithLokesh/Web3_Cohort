import {
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptAccount,
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Keypair,
  SystemProgram,
  Transaction
} from "@solana/web3.js";
import { useState } from "react";

export function TokenLaunchpad() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [formValues, setFormValues] = useState({
    name: "",
    symbol: "",
    imageUrl: "",
    initialSupply: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createToken = async () => {
    const lamports = await getMinimumBalanceForRentExemptAccount(connection);
    const keypair = Keypair.generate();
    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: keypair.publicKey,
        space: MINT_SIZE,
        lamports,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMint2Instruction(
        keypair.publicKey,
        6,
        wallet.publicKey,
        wallet.publicKey,
        TOKEN_PROGRAM_ID
      )
    );

    const recentBlockHash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = recentBlockHash.blockhash;
    transaction.feePayer = wallet.publicKey;

    transaction.partialSign(keypair);
    const response = await wallet.sendTransaction(transaction, connection);
    console.log(response);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <h1 className="mb-7">Solana Token Launchpad</h1>
      <input
        className="inputText"
        type="text"
        name="name"
        placeholder="Name"
        value={formValues.name}
        onChange={handleChange}
      />
      <br />

      <input
        className="inputText"
        type="text"
        name="symbol"
        placeholder="Symbol"
        value={formValues.symbol}
        onChange={handleChange}
      />
      <br />

      <input
        className="inputText"
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={formValues.imageUrl}
        onChange={handleChange}
      />
      <br />

      <input
        className="inputText"
        type="text"
        name="initialSupply"
        placeholder="Initial Supply"
        value={formValues.initialSupply}
        onChange={handleChange}
      />
      <br />
      <button className="btn" onClick={createToken}>
        Create a token
      </button>
    </div>
  );
}
