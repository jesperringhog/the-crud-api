import { model, Schema } from "mongoose";

export const productSchema = new Schema({
  articleNumber: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const Product = model("product", productSchema);
