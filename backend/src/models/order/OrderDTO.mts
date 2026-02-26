import type { CartItemDTO } from "../cartItem/CartItemDTO.mjs";
import type { ProductDTO } from "../product/ProductDTO.mjs";

export type OrderDTO = {
    orderNumber: number;
    date: number;
    customer: string;
    cartItems: CartItemDTO[];
}