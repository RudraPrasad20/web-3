require("dotenv");
import express from "express";
// const { userModel } = require("./models");
import { Connection, Keypair, Transaction } from "@solana/web3.js";
import jwt from "jsonwebtoken"
import bs58 from "bs58"
import cors from "cors"

const connection = new Connection("https://devnet.helius-rpc.com/?api-key=68e9d1c4-d4d1-46c7-a650-f53cde910002"
)

const app = express()
app.use(express.json())
app.use(cors())
const JWT_SECRET = "123456"

// app.post("/api/v1/signup", async (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     // Validate the inputs using zod, check if the user already exists, hash the password

//     const keypair = new Keypair();
//     await userModel.create({
//         username,
//         password,
//         publicKey: keypair.publicKey.toString(),
//         privateKey: keypair.secretKey.toString()
//     })
//     res.json({
//         message: keypair.publicKey.toString()
//     })
// })

// app.post("/api/v1/signin", async (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;

//     const user = await userModel.findOne({
//         username: username,
//         password: password
//     })

//     if (user) {
//         const token = jwt.sign({
//             id: user
//         }, JWT_SECRET)
//         res.json({
//             token
//         })
//     } else {

//         res.status(403).json({
//             message: "Credentials are incorrect"
//         })
//     }
// })

app.post("/api/v1/txn/sign", async (req: any, res: any) => {
    const serializedTransaction = req.body.message;
const secret = bs58.decode("4HwjgwegJiWfW5wLKfhM1e4hgxv4NBJRmM6Bb13Saj6bqSErn5eFowR568WvdfZPQJfStsyqEFMdy8NpnY2Pt4hk")
    console.log("before serialise")
    console.log(serializedTransaction);

    const tx = Transaction.from(Buffer.from(serializedTransaction))
    console.log("after serialise")
    
    console.log(bs58)
    const keyPair = Keypair.fromSecretKey(secret);

    const {blockhash} = await connection.getLatestBlockhash();
    tx.recentBlockhash = blockhash
    tx.feePayer = keyPair.publicKey

    tx.sign(keyPair)

    const signature = await connection.sendTransaction(tx, [keyPair])
    console.log(signature)

    res.json({
        message: "Sign up"
    })
})

app.get("/api/v1/txn", (req: any, res: any) => {
    res.json({
        message: "Sign up"
    })
})

app.listen(3000);