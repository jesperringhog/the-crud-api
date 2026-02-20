import express from "express";
import { createProduct } from "../controller/productController.mjs";

export const productRouter = express.Router();

productRouter.post("/", async (req, res) => {
    try {
        const { name, price } = req.body;

        if (name && name === "") {
            res.status(400).json({message: "Body is missing property: name, or it's value is empty"})
            return;
        }

        if (price && price === "") {
            res.status(400).json({message: "Body is missing property: price, or it's value is empty"})
            return;
        }

        const createdProduct = await createProduct(name, price);
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
})