import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useState, useEffect } from "react";

export function RequestAirdrop() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState<number | null>(null);

  async function requestAirdrop() {
    const airdropAmount = parseFloat(amount);

    // if input is empty or value in -ve show alert & return
    if (isNaN(airdropAmount) || airdropAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    // call fn , request airdrop with public key & amount (from input)
    await connection.requestAirdrop(
      wallet.publicKey as PublicKey,
      airdropAmount * LAMPORTS_PER_SOL
    );

    // await connection.confirmTransaction(res);

    alert("Airdropped " + amount + " SOL to " + wallet.publicKey?.toBase58());
    // console.log(res);

  }

  // showing account balance:
  useEffect(() => {
  async function fetchBalance() {
    // if public key is available then proceed
    // calling getBalance fn with public key
    if (wallet.publicKey) {
      const lamports = await connection.getBalance(wallet.publicKey);
      setBalance(lamports / LAMPORTS_PER_SOL); // Convert lamports to SOL
    }
  }
  fetchBalance()
 }, [wallet.publicKey])
  // Fetch balance when the wallet is connected or after the airdrop


  return (
    <div>
      <br />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={requestAirdrop}>Request Airdrop</button>
      <div>
        {wallet.publicKey && (
          <p>{balance !== null ? `Balance: ${balance} SOL` : "Fetching balance..."}</p>
        )}
      </div>
    </div>
  );
}
