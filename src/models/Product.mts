import { model, Schema } from "mongoose";

const productSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: false },
});

export const Product = model("product", productSchema);