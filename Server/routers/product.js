import express from "express"
import { allProducts, createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product.js";

export const productRoute = express.Router();

productRoute.post("/new", createProduct)
productRoute.get("/", allProducts);
productRoute.get("/:id", getProduct);
productRoute.put("/:id", updateProduct);
productRoute.delete("/:id", deleteProduct);