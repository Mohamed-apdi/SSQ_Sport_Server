import express from "express"
import { allProducts, createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product.js";
import { isProtect } from "../middlewares/authMiddleware.js";

export const productRoute = express.Router();

productRoute.post("/new", isProtect, createProduct)
productRoute.get("/", allProducts);
productRoute.get("/:id", getProduct);
productRoute.put("/:id", isProtect, updateProduct);
productRoute.delete("/:id", isProtect, deleteProduct);