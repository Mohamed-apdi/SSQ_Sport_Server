import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/user.js';
import { dbConnection } from './Config/dbconnect.js';
import { productRoute } from './routers/product.js';
import cors from "cors";

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // Allow your Vite development server
    credentials: true, // Allow cookies and credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
};

app.use(cors(corsOptions));

// Preflight request handling
app.options('*', cors(corsOptions));

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/user", userRouter);
app.use("/api/product", productRoute);

app.use((req, res, next) => {
    console.log('Request Origin:', req.headers.origin);
    next();
});


dbConnection();

app.listen(7000, () => {
    console.log("Server listening on 7000");
});