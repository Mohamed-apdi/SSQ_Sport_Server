import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const dbConnection = async () => {
    const dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/default-db";
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            writeConcern: { w: "majority" },
        });
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); // Exit process with failure
    }
};

export default dbConnection;
