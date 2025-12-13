import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";

const connection = new Connection("http://127.0.0.1:8899");

async function main() {
  const kp = new Keypair();
  const res = await connection.requestAirdrop(
    kp.publicKey,
    3 * LAMPORTS_PER_SOL
  );
  const latestBlockhash = await connection.getLatestBlockhash();
  await connection.confirmTransaction({
    signature: res,
    blockhash: latestBlockhash.blockhash,
    lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
  });
  const balance = await connection.getBalance(kp.publicKey);
  console.log("balance", balance);
}

main();
