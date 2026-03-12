import type { CartItemDTO } from "../cartItem/CartItemDTO.mjs";
import type { UserDTO } from "../user/UserDTO.mjs";

export type OrderDTO = {
    orderNumber: number;
    date: number;
    user: UserDTO;
    cartItems: CartItemDTO[];
}