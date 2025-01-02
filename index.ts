import express from "express";
import mongoose from "mongoose";

const app = express();

const MONGO_URI = 'mongodb://localhost:27017/RedcipeManager'

const main = async() => {
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

    }catch(err){
        console.log(`Error connecting to MongoDB: ${err}`);
        process.exit(1);
    }
}

main()