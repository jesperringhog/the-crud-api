import type { Product } from "../models/Product";
import { createHtmlUpdateForm } from "./createHtmlUpdateForm";
import { initRemoveProduct } from "./initRemoveProduct";

export const createHtmlForProducts = (products: Product[]) => {
    const productList = document.getElementById("productList");

    if (!productList) return;
    productList.innerHTML = "";

    products.forEach((p) => {
        const productContainer = document.createElement("li");
        const id = document.createElement("p");
        const name = document.createElement("h2");
        const price = document.createElement("h4");
        const removeBtn = document.createElement("button");

        productContainer.className = "productContainer";
        id.textContent = p.id.toString();
        name.textContent = p.name;
        price.textContent = p.price.toString();
        removeBtn.textContent = "Remove";

        createHtmlUpdateForm(p, productContainer);
        initRemoveProduct(p.id, removeBtn);

        productContainer.appendChild(id);
        productContainer.appendChild(name);
        productContainer.appendChild(price);
        productContainer.appendChild(removeBtn);
        productList.appendChild(productContainer);
    })
}