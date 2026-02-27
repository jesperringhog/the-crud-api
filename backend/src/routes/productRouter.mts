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
    const { sort, filter } = req.query;

    const products = await getProducts(sort, filter);

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

    if (+id === product.id) {
      const success = await updateProduct(product);

      if (success) {
        res.status(200).json(success);
        return;
      }

      res.status(404).json({
        message: "Update failed. Body is missing property: id",
      });
    }

    res.status(400).json({
      message: `Id: ${id} not found, or body value and parameter does not match`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const success = await removeProduct(id);

      if (success) {
        res.status(200).json();
        return;
      }
      res.status(404).json({ message: "Nothing to delete: product not found" });
    }

    res.status(400).json({ message: `Id: ${id} not found` });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
