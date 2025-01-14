import { createInitializeAccount2Instruction, createInitializeMintInstruction, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'

const CreateToken = async() => {
    const {connection} = useConnection()
    const wallet = useWallet()

    try {
        const lamports = await getMinimumBalanceForRentExemptMint(connection)
        const mintPublicKey = Keypair.generate()

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey as PublicKey,
                newAccountPubkey: mintPublicKey.publicKey,
                lamports: lamports,
                space: MINT_SIZE,
                programId: TOKEN_PROGRAM_ID
            }),
            createInitializeMintInstruction(
                wallet.publicKey as PublicKey,
                9,
                mintPublicKey.publicKey,
                wallet.publicKey,
                TOKEN_PROGRAM_ID
                )
        )
        
    } catch (error) {
        console.log(error)
    }

    const result = await 
  return (
    <div>
        
    </div>
  )
}

export default CreateToken