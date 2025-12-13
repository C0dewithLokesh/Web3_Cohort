import { expect, test } from "vitest";
import * as borsh from "borsh";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { COUNTER_SIZE, schema } from "./types";

const adminAccount = Keypair.generate();
const dataAccount = Keypair.generate();

const PROGRAM_ID = new PublicKey(
  "4mSQ1wL79xx38efShwmwyQpUGc9eHhq5xS6BbkNM4Qvd",
);

test("Account is initialized", async () => {
  const connection = new Connection("http://127.0.0.1:8899");

  const airdropSignautre = await connection.requestAirdrop(
    adminAccount.publicKey,
    1 * LAMPORTS_PER_SOL,
  );
  const latestBlockhash = await connection.getLatestBlockhash();
  await connection.confirmTransaction({
    signature: airdropSignautre,
    blockhash: latestBlockhash.blockhash,
    lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
  });

  const minLamports =
    await connection.getMinimumBalanceForRentExemption(COUNTER_SIZE);

  const ix = SystemProgram.createAccount({
    fromPubkey: adminAccount.publicKey,
    lamports: minLamports,
    space: COUNTER_SIZE,
    programId: PROGRAM_ID,
    newAccountPubkey: dataAccount.publicKey,
  });

  const createAccountTransaction = new Transaction();
  createAccountTransaction.add(ix);

  const signature = await sendAndConfirmTransaction(
    connection,
    createAccountTransaction,
    [adminAccount, dataAccount],
  );

  console.log(
    "Created Account with signature:",
    signature,
    dataAccount.publicKey.toBase58(),
  );

  const dataAccountInfo = await connection.getAccountInfo(
    dataAccount.publicKey,
  );
  if (!dataAccountInfo?.data)
    throw Error("Data Account data is not available.");

  const counter = borsh.deserialize(schema, dataAccountInfo.data, true) as {
    count: number;
  };

  if (!counter || !counter?.count) throw Error("counter not available");

  expect(counter.count).toBe(0);
}, 60_000);
