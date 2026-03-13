import {
  dbProductToDto,
  Product,
  type dbProduct,
} from "../models/product/Product.mjs";
import type { ProductDTO } from "../models/product/ProductDTO.mjs";
import type { QueryParamValue } from "../models/raw/QueryParamValue.mjs";

export const createProduct = async (title: string, price: number) => {
  const newDbProduct = await Product.create({
    id: +Date.now().toString().slice(5),
    title,
    price,
  });

  return dbProductToDto(newDbProduct);
};

export const getProducts = async (
  sort: QueryParamValue,
  filter: QueryParamValue,
) => {
  const query: any = {};
  const sortOption: any = {};

  if (sort) {
    sort === "asc" ? (sortOption.id = 1) : (sortOption.id = -1);
  }

  filter ? (query.title = { $regex: filter, $options: "i" }) : {};

  const products = await Product.find(query).sort(sortOption);

  return products.map(dbProductToDto);
};

export const updateProduct = async (product: dbProduct) => {
  const updated = await Product.findOneAndUpdate({ id: product.id }, product, {
    returnDocument: "after",
  });

  if (!updated) return false;

  return dbProductToDto(updated);
};

export const removeProduct = async (id: string) => {
  const removed = await Product.findOneAndDelete({
    id: +id,
  });

  return removed ? true : false;
};
