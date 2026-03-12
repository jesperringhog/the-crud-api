import type { CartItem } from "./CartItem";
import type { User } from "./User";

export type Order = {
    orderNumber: number,
    date: number,
    user: User,
    cartItems: CartItem[]
}