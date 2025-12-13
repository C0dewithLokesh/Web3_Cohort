import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

const connection = new Connection("http://127.0.0.1:8899");
const space = 8;
const lamports = await connection.getMinimumBalanceForRentExemption(space);

async function main() {
  const kp = new Keypair();
  const dataAccount = new Keypair();

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

  const instruction = SystemProgram.createAccount({
    fromPubkey: kp.publicKey,
    lamports,
    programId: SystemProgram.programId,
    newAccountPubkey: dataAccount.publicKey,
    space,
  });

  const tx = new Transaction().add(instruction);

  await sendAndConfirmTransaction(connection, tx, [kp, dataAccount]);
  console.log(dataAccount.publicKey.toString());
}

main();
