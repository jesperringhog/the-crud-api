import { model, Schema, type InferSchemaType } from "mongoose";
import { productSchema } from "./Product.mjs";
import type { OrderDTO } from "./OrderDTO.mjs";

const orderSchema = new Schema({
  orderNumber: { type: Number, required: true },
  date: { type: Number, required: true },
  customer: { type: String, required: true },
  products: [productSchema],
});

export const Order = model("order", orderSchema);

export type OrderFromDb = InferSchemaType<typeof orderSchema>;

export const dbOrderToDto = (dbOrder: OrderFromDb): OrderDTO => {
  return {
    orderNumber: dbOrder.orderNumber,
    date: dbOrder.date,
    customer: dbOrder.customer,
    products: dbOrder.products.map((p) => {
      return {
        articleNumber: p.articleNumber,
        name: p.name,
        price: p.price,
        amount: p.amount,
      };
    }),
  };
};
