import type { ProductDTO } from "../product/ProductDTO.mjs";

export type OrderDTO = {
    orderNumber: number;
    date: number;
    customer: string;
    products: ProductDTO[];
}