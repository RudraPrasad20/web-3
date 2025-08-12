
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import "@solana/wallet-adapter-react-ui/styles.css";
import { TokenLaunchpad } from './components/launchpad';



export const App = () => {
  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]}>
        <WalletModalProvider>
          <WalletMultiButton />
          
          <TokenLaunchpad/>

        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
