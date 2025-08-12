import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  MINT_SIZE,
  TOKEN_PROGRAM_ID,
  createInitializeMint2Instruction,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";
import { useState } from "react";

export function TokenLaunchpad() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [supply, setSuply] = useState("");

  console.log(name, symbol, imageUrl, supply);

  const { connection } = useConnection();
  const wallet = useWallet();

  async function createToken() {
    try {
      const lamports = await getMinimumBalanceForRentExemptMint(connection); // get data from the owner
      const mintKeypair = Keypair.generate(); // generate keypair

      // Fetch the latest blockhash from the Solana network
      const { blockhash } = await connection.getLatestBlockhash();

      // Create a new transaction
      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey as PublicKey, // sender
          newAccountPubkey: mintKeypair.publicKey, // mintkeypair we created just before
          space: MINT_SIZE, // 82 or the mint size
          lamports,
          programId: TOKEN_PROGRAM_ID, // // owner - TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
        }),
        createInitializeMint2Instruction(
          mintKeypair.publicKey,
          9, // decimals
          wallet.publicKey as PublicKey, // mint authority
          wallet.publicKey, // freeze authority
          TOKEN_PROGRAM_ID
        )
      );

      // Set the recent blockhash and fee payer
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = wallet.publicKey as PublicKey;

      // Partially sign the transaction with the mintKeypair
      transaction.partialSign(mintKeypair);

      // Send the transaction via the wallet
      const transactionId = await wallet.sendTransaction(transaction, connection);

      console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
      console.log(`Transaction ID: ${transactionId}`);
    } catch (error) {
      console.error("Error creating token:", error);
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Solana Token Launchpad</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>{" "}
      <br />
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      ></input>{" "}
      <br />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      ></input>{" "}
      <br />
      <input
        type="text"
        value={supply}
        onChange={(e) => setSuply(e.target.value)}
      ></input>{" "}
      <br />
      <button onClick={createToken} className="btn">
        Create a token
      </button>
    </div>
  );
}
