import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/user.js';
import { dbConnection } from './Config/dbconnect.js';
import { productRoute } from './routers/product.js';
import cors from "cors";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your React app's URL
  credentials: true, // Allow credentials (cookies, authorization headers)
};

app.use(express.json())
app.use(cors(corsOptions));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/user", userRouter);
app.use("/api/product", productRoute);

dbConnection();

app.listen(7000, () => {
    console.log("Server listening on 7000");
});