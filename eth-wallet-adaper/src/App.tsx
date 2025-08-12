
import { createConfig, WagmiProvider } from 'wagmi'
import './App.css'
import { config } from './config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WalletOptions } from './components/WalletOptions'
import AccountInfo from './components/AccountInfo'

function App() {
  const queryClient = new QueryClient()

  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}> 
    <WalletOptions />
    <AccountInfo/>
    </QueryClientProvider> 
  </WagmiProvider>
  )
}

export default App
