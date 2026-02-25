import { Product } from "../models/product/Product.mjs";
import type { ProductDTO } from "../models/product/ProductDTO.mjs";
import type { QueryParamValue } from "../models/raw/QueryParamValue.mjs";

export const createProduct = async (name: string, price: number) =>
  await Product.create({
    itemNumber: +Date.now().toString().slice(5),
    name,
    price,
  });

export const getProducts = async (sort: QueryParamValue, filter: QueryParamValue) => {
  const found = await Product.find();

  let products = [...found];
  if (sort) {
    const direction = sort === "asc" ? 1 : -1;
    products.sort((a, b) => (a.itemNumber - b.itemNumber) * direction);
  }

  if (filter) {
    products = products.filter((p) => p.name.toLowerCase().includes(filter.toString())); 
  }

  return products;
};

export const updateProduct = async (product: ProductDTO) => {
  const updated = await Product.findOneAndUpdate(
    { itemNumber: product.itemNumber },
    product,
  );

  return updated ? product : false;
};

export const removeProduct = async (itemNumber: string) => {
  const removed = await Product.findOneAndDelete({
    itemNumber: +itemNumber,
  });

  return removed ? true : false;
};
