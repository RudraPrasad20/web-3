import React from 'react'
import { useAccount, useBalance, useDisconnect } from 'wagmi'

const AccountInfo = () => {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const balance = useBalance({address})
  return (
    <div>
        <div>{address}</div>
        <div>{balance?.data?.formatted}eth</div>
        
         <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  )
}

export default AccountInfo