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

productRouter.patch("/:articlenumber", async (req, res) => {
  try {
    const { articlenumber } = req.params;
    const { product }: { product: ProductDTO } = req.body;

    if (+articlenumber === product.articleNumber) {
      const updateSuccess = await updateProduct(product);

      if (updateSuccess) {
        res.status(200).json(updateSuccess);
        return;
      }

      res
        .status(400)
        .json({
          message: "Articlenumber in body does not match with parameter",
        });
    }

    res.status(404).json({ message: "Update failed. Body is missing property: articleNumber" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

productRouter.delete("/:articlenumber", async (req, res) => {
  try {
    const { articlenumber } = req.params;

    const removeSuccess = await removeProduct(articlenumber);

    if (removeSuccess) {
      res.status(200).json();
      return;
    }

    res.status(404).json({ message: "Nothing to delete: product not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
