import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/user.js';
import { dbConnection } from './Config/dbconnect.js';
import { productRoute } from './routers/product.js';
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT || 7000;
const app = express();

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/user", userRouter);
app.use("/api/product", productRoute);

dbConnection();

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});