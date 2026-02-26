import { model, Schema, type InferSchemaType } from "mongoose";
import type { OrderDTO } from "./OrderDTO.mjs";
import { cartItemSchema, dbCartItemToDto } from "../cartItem/CartItem.mjs";

const orderSchema = new Schema({
  orderNumber: { type: Number, required: true },
  date: { type: Number, required: true },
  customer: { type: String, required: true },
  cartItems: [cartItemSchema],
});

export const Order = model("order", orderSchema);

export type DbOrder = InferSchemaType<typeof orderSchema>;

export const dbOrderToDto = (dbOrder: DbOrder): OrderDTO =>
  ({
    orderNumber: dbOrder.orderNumber,
    date: dbOrder.date,
    customer: dbOrder.customer,
    cartItems: dbOrder.cartItems.map(dbCartItemToDto),
  }) satisfies OrderDTO;
