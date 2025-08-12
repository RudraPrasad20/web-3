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
  const endpoint = ""; // your connection endpoint
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
