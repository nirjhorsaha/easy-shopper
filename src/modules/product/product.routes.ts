import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

// Create a New Product
router.post("/", ProductController.createProduct);

// Retrieve a List of All Products
router.get("/", ProductController.getAllProducts);


export const ProductRoutes = router;
