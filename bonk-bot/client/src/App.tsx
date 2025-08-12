import "./App.css";
import {
  Transaction,
  Connection,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import axios from "axios";
import { useState } from "react";

function App() {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  async function initiate() {
    try {
      const connection = new Connection(
        "https://devnet.helius-rpc.com/?api-key=68e9d1c4-d4d1-46c7-a650-f53cde910002"
      );

      const payer = new PublicKey("GHZ29nUjyQrLcfxFNUTtKbLxmrkW3Za7ysk9Xi6yofsc"); // Add the payer's public key
      const recipient = new PublicKey(address); // Use the entered address

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: payer,
          toPubkey: recipient,
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = payer;

      const serializedTrans = transaction.serialize({
        requireAllSignatures: false,
        verifySignatures: false,
      });

      await axios.post("http://localhost:3000/api/v1/txn/sign", {
        message: serializedTrans,
        retry: false,
      });

      alert("Transaction initiated!");
    } catch (error) {
      console.error("Error initiating transaction:", error);
      alert("Failed to initiate transaction.");
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={initiate}>Submit</button>
    </div>
  );
}

export default App;
