import { model, Schema, type InferSchemaType } from "mongoose";
import type { OrderDTO } from "./OrderDTO.mjs";
import { cartItemSchema, dbCartItemToDto } from "../cartItem/CartItem.mjs";
import { dbUserToDto, userSchema } from "../user/User.mjs";
import { dbProductToDto } from "../product/Product.mjs";

const orderSchema = new Schema({
  orderNumber: { type: Number, required: true },
  date: { type: Number, required: true },
  user: { type: userSchema, required: true },
  cartItems: [cartItemSchema],
});

export const Order = model("order", orderSchema);

export type DbOrder = InferSchemaType<typeof orderSchema>;

export const dbOrderToDto = (dbOrder: DbOrder): OrderDTO => {
  if (!dbOrder.user) throw Error("Order user missing");

  return {
    orderNumber: dbOrder.orderNumber,
    date: dbOrder.date,
    user: dbUserToDto(dbOrder.user),
    cartItems: dbOrder.cartItems.map(dbCartItemToDto),
  } satisfies OrderDTO;
};
