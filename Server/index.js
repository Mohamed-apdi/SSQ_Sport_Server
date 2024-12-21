import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/user.js';
import { dbConnection } from './Config/dbconnect.js';
import { productRoute } from './routers/product.js';
import cors from "cors";

const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/user", userRouter);
app.use("/api/product", productRoute);

dbConnection();

app.listen(7000, () => {
    console.log("Server listening on 7000");
});