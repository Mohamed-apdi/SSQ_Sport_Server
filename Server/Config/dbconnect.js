import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.MONGODB_URI;

export const dbConnection = async () => {
    try {
        await mongoose.connect(dbUrl, { writeConcern : {w: 'majority'}});
        console.log("Connected to Database");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}