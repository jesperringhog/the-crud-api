import { Product } from "../models/Product.mjs";
import type { ProductDTO } from "../models/ProductDTO.mjs";

export const createProduct = async (name: string, price: number) =>
  await Product.create({
    id: Date.now(),
    name,
    price,
  });

export const getProducts = async () => await Product.find();

export const updateProduct = async (product: ProductDTO) => {
  await Product.findOneAndUpdate({ id: product.id }, product);

  return product;
};
