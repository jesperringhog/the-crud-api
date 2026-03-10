import { model, Schema, type InferSchemaType } from "mongoose";
import type { OrderDTO } from "./OrderDTO.mjs";
import { cartItemSchema, dbCartItemToDto } from "../cartItem/CartItem.mjs";
import { dbUserToDto, userSchema } from "../user/User.mjs";

const orderSchema = new Schema({
  orderNumber: { type: Number, required: true },
  date: { type: Number, required: true },
  user: [userSchema],
  cartItems: [cartItemSchema],
});

export const Order = model("order", orderSchema);

export type DbOrder = InferSchemaType<typeof orderSchema>;

export const dbOrderToDto = (dbOrder: DbOrder): OrderDTO =>
  ({
    orderNumber: dbOrder.orderNumber,
    date: dbOrder.date,
    user: dbOrder.user.map(dbUserToDto),
    cartItems: dbOrder.cartItems.map(dbCartItemToDto),
  }) satisfies OrderDTO;
