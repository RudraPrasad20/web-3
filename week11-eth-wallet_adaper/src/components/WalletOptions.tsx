
import { Connector, useBalance, useConnect } from 'wagmi'

export function WalletOptions() {
  const { connectors, connect } = useConnect()
  const balance = useBalance()

  return connectors.map((connector) => (
    <>
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
    
    </>
  ))
}