import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Rudra:dbrudra@zennet.kl2qxni.mongodb.net/")

const BonkUserData = new mongoose.Schema({
    username: String,
    password: String,
    privateKey: String,
    publicKey: String,
})

export const bonkmodel = mongoose.model("bonk", BonkUserData)

