import type { ProductDTO } from "../product/ProductDTO.mjs"

export type CartItemDTO = {
    product: ProductDTO;
    quantity: number;
}