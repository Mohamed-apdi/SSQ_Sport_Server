import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/user.js';
import { dbConnection } from './Config/dbconnect.js';
import { productRoute } from './routers/product.js';
import cors from "cors";

const app = express();

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/user", userRouter);
app.use("/api/product", productRoute);

dbConnection();

app.listen(7000, () => {
    console.log("Server listening on 7000");
});