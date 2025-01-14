// making a sol faucet

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { RequestAirdrop } from "./components/Airdrop";

export const App = () => {
  const endpoint = "https://devnet.helius-rpc.com/?api-key=68e9d1c4-d4d1-46c7-a650-f53cde910002";
  return (
    <ConnectionProvider
      endpoint={
        endpoint
      }
    >
      <WalletProvider wallets={[]}>
        <WalletModalProvider>
          <WalletMultiButton />
          <RequestAirdrop />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
