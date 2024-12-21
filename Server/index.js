import express from 'express';
import { userRouter } from './routers/user.js';
import { dbConnection } from './Config/dbconnect.js';
import { productRoute } from './routers/product.js';

const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRoute);

dbConnection()


app.listen(7000, () => {
    console.log("Server listening on 7000")
})