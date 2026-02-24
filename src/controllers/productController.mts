import { Product } from "../models/product/Product.mjs";
import type { ProductDTO } from "../models/product/ProductDTO.mjs";
import type { QueryParamValue } from "../models/raw/QueryParamValue.mjs";
import { sortList } from "../utils/sortBase.mjs";

export const createProduct = async (name: string, price: number) =>
  await Product.create({
    articleNumber: Date.now(),
    name,
    price,
    quantity: 1,
  });

export const getProducts = async (sort: QueryParamValue) => {
  const foundProducts = await Product.find();

  let products = [...foundProducts];
  if (sort) {
    const direction = sort === "asc" ? 1 : -1;
    products.sort((a, b) => (a.articleNumber - b.articleNumber) * direction);
  }

  return products;
};

export const updateProduct = async (product: ProductDTO) => {
  const updated = await Product.findOneAndUpdate(
    { articleNumber: product.articleNumber },
    product,
  );

  return updated ? product : false;
};

export const removeProduct = async (articleNumber: string) => {
  const removed = await Product.findOneAndDelete({
    articleNumber: +articleNumber,
  });

  return removed ? true : false;
};
