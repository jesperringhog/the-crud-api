import { model, Schema } from "mongoose";

export const productSchema = new Schema({
  articleNumber: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
});

export const Product = model("product", productSchema);
