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

    const created = await createProduct(name, price);
    res.status(201).json(created);
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

productRouter.patch("/:itemNumber", async (req, res) => {
  try {
    const { itemNumber } = req.params;
    const { product }: { product: ProductDTO } = req.body;

    if (+itemNumber === product.itemNumber) {
      const success = await updateProduct(product);

      if (success) {
        res.status(200).json(success);
        return;
      }

      res.status(404).json({
        message: "Update failed. Body is missing property: itemNumber",
      });
    }

    res.status(400).json({
      message: `The value for itemNumber in body does not match with parameter: ${itemNumber}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

productRouter.delete("/:itemNumber", async (req, res) => {
  try {
    const { itemNumber } = req.params;

    if (itemNumber) {
      const success = await removeProduct(itemNumber);

      if (success) {
        res.status(200).json();
        return;
      }
      res.status(404).json({ message: "Nothing to delete: product not found" });
    }

    res.status(400).json({ message: `Item number: ${itemNumber} not found` });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
