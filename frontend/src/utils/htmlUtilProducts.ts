import { createHtmlForProduct } from "../components/products/createHtmlProduct";
import type { Product } from "../models/Product";

export const createHtmlProductSection = (products: Product[]) => {
    const productList = document.getElementById("productList");

    if (!productList) return;
    productList.innerHTML = "";

    products.forEach((p) => {
        const productContainer = createHtmlForProduct(p);

        productList.appendChild(productContainer);
    })
}