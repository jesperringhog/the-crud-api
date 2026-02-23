import { Product } from "../models/Product.mjs";

export const createProduct = async (name: string, price: number) =>
  await Product.create({
    id: Date.now(),
    name,
    price,
  });

  export const getProducts = async () => await Product.find();
