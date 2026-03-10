import { model, Schema, type InferSchemaType } from "mongoose";
import type { ProductDTO } from "./ProductDTO.mjs";

export const productSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true, unique: true, minLength: 3 },
  price: { type: Number, required: true },
});

export const Product = model("product", productSchema);

export type dbProduct = InferSchemaType<typeof productSchema>;

export const dbProductToDto = (dbProduct: dbProduct): ProductDTO => ({
    id: dbProduct.id,
    title: dbProduct.title,
    price: dbProduct.price,
} satisfies ProductDTO);
