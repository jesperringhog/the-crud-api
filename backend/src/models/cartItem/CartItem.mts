import { model, Schema, type InferSchemaType } from "mongoose";
import { dbProductToDto, productSchema } from "../product/Product.mjs";
import type { CartItemDTO } from "./CartItemDTO.mjs";

export const cartItemSchema = new Schema ({
    product: { type: productSchema, required: true },
    quantity: { type: Number, required: true },
})

export const CartItem = model("cartItem", cartItemSchema);

export type dbCartItem = InferSchemaType<typeof cartItemSchema>;

export const dbCartItemToDto = (dbCartItem: dbCartItem): CartItemDTO => ({
    product: dbProductToDto(dbCartItem.product),
    quantity: dbCartItem.quantity,
} satisfies CartItemDTO);