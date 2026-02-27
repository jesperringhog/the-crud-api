import { model, Schema, type InferSchemaType } from "mongoose";
import type { ProductDTO } from "./ProductDTO.mjs";

export const productSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true, minLength: 5 },
  price: { type: Number, required: true },
});

export const Product = model("product", productSchema);

export type dbProduct = InferSchemaType<typeof productSchema>;

export const dbProductToDto = (dbProduct: dbProduct): ProductDTO => ({
    id: dbProduct.id,
    name: dbProduct.name,
    price: dbProduct.price,
} satisfies ProductDTO);
