import express from "express";
import {
  createProduct,
  getProducts,
  removeProduct,
  updateProduct,
} from "../controllers/productController.mjs";
import type { ProductDTO } from "../models/product/ProductDTO.mjs";

export const productRouter = express.Router();

productRouter.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;

    if (name && name === "") {
      res.status(400).json({
        message: "Body is missing property: name, or it's value is empty",
      });
      return;
    }

    if (price && price === "") {
      res.status(400).json({
        message: "Body is missing property: price, or it's value is empty",
      });
      return;
    }

    const createdProduct = await createProduct(name, price);
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

productRouter.get("/", async (req, res) => {
  try {

    const { sort } = req.query;

    const products = await getProducts(sort);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

productRouter.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { product }: { product: ProductDTO } = req.body;

    if (+id === product.articleNumber) {
      const foundProduct = await updateProduct(product);

      if (foundProduct) {
        res.status(200).json(foundProduct);
        return;
      }

      res.status(404).json({ message: "Update failed: product not found" });
    }

    res
      .status(400)
      .json({ message: "Id in parameter and body does not match" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

productRouter.delete("/:articleNumber", async (req, res) => {
  try {
    const { articleNumber } = req.params;

    const removeSuccess = await removeProduct(articleNumber);

    if (removeSuccess) {
      res.status(200).json();
      return;
    }

    res.status(404).json({ message: "Product not found, nothing to delete" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
