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
  const { title, price } = req.body;

  if (
    !title ||
    title.trim() === "" ||
    typeof price !== "number" ||
    !Number.isFinite(price)
  )
    return res.status(400).json({
      message:
        "Body is missing property: title and/or price, or their values are empty",
    });

  try {
    const created = await createProduct(title, price);

    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

productRouter.get("/", async (req, res) => {
  const { sort, filter } = req.query;

  try {
    const products = await getProducts(sort, filter);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

productRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { product }: { product: ProductDTO } = req.body;

  try {
    if (id && +id === product.id) {
      const success = await updateProduct(product);

      if (!success)
        return res.status(400).json({
          message: "Update failed. Body is missing property: id",
        });

      return res.status(200).json(success);
    }

    res.status(404).json({
      message: `Id: ${id} not found, or body value and parameter does not match`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

productRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const success = await removeProduct(id);

      if (!success)
        return res.status(400).json({ message: `Id: ${id} not found` });
      else return res.status(200).json();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
