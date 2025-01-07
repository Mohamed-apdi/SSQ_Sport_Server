import express from 'express';
import { userRouter } from './routers/user.js';
import { productRoute } from './routers/product.js';
import cors from 'cors';
import dotenv from 'dotenv';
import dbConnection from './Config/dbconnect.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  credentials: true, // Allow cookies and credentials (if needed)
}));

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRoute);

// Database connection
dbConnection();

// Start the server
app.listen(3000, () => {
  console.log(`Server listening on 3000`);
});