import { useState } from 'react'
import './App.css'
import { generateMnemonic } from "bip39";
import { SolanaWallet } from './solWallet';
import { EthWallet } from './ethWallet';
import { Buffer } from 'buffer';
window.Buffer = window.Buffer || Buffer;


function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
      <input type="text" value={mnemonic} onChange={(e) => setMnemonic(e.target.value)}></input>
      <button onClick={async function() {
        console.log("Button clicked!"); // Debugging log
        const mn = generateMnemonic();
        console.log("Generated mnemonic:", mn); // Debugging log
        setMnemonic(mn);
      }}>
        Create Seed Phrase
      </button>

      {mnemonic && <SolanaWallet mnemonic={mnemonic} />}
      {mnemonic && <EthWallet mnemonic={mnemonic} />}
    </>
  )
}

export default App;
