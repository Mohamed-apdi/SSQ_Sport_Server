import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnection = async () => {
    const dbUrl = process.env.MONGODB_URI;
    try {
        await mongoose.connect( process.env.MONGODB_URL, {
            writeConcern: { w: "majority" },
        });
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); 
    }
};

export default dbConnection;
