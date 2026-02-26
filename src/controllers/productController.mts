import { dbProductToDto, Product } from "../models/product/Product.mjs";
import type { ProductDTO } from "../models/product/ProductDTO.mjs";
import type { QueryParamValue } from "../models/raw/QueryParamValue.mjs";

export const createProduct = async (name: string, price: number) => {
  const newDbProduct = await Product.create({
    itemNumber: +Date.now().toString().slice(5),
    name,
    price,
  });

  return dbProductToDto(newDbProduct);
};

export const getProducts = async (
  sort: QueryParamValue,
  filter: QueryParamValue,
) => {
  
  const dbProducts = await Product.find();

  let productDtos = dbProducts.map((p) => dbProductToDto(p));

  if (sort) {
    const direction = sort === "asc" ? 1 : -1;
    productDtos.sort((a, b) => (a.itemNumber - b.itemNumber) * direction);
  }

  if (filter) {
    productDtos = productDtos.filter((p) =>
      p.name.toLowerCase().includes(filter.toString()),
    );
  }

  return productDtos;
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
