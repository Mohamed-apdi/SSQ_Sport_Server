import express from "express"
import { allProducts, createProduct, deleteImage, deleteProduct, getProduct, getProductsOverview, updateProduct } from "../controllers/product.js";
import { isProtect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

export const productRoute = express.Router();

productRoute.post("/new", isProtect, upload.array("images", 5), createProduct); // Allow up to 5 images
productRoute.get("/", allProducts);
productRoute.put("/:id", isProtect, upload.array("images", 5), updateProduct);
productRoute.get("/overview", getProductsOverview);
productRoute.get("/:id", getProduct);
productRoute.delete("/:id", isProtect, deleteProduct);
productRoute.delete("/:id/images/:imageId", deleteImage);