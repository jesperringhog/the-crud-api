import type { Product } from "../../models/Product";
import { initRemoveProduct } from "./initRemoveProduct";
import { createHtmlUpdateForm } from "./initUpdateProductForm";

export const createHtmlForProduct = (product: Product) => {
        const productContainer = document.createElement("li");
        const id = document.createElement("p");
        const title = document.createElement("h2");
        const price = document.createElement("h4");
        const removeBtn = document.createElement("button");

        productContainer.className = "productContainer";
        id.textContent = product.id.toString();
        title.textContent = product.title;
        price.textContent = product.price.toString();
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        createHtmlUpdateForm(product, productContainer);
        initRemoveProduct(product.id, removeBtn);

        productContainer.appendChild(id);
        productContainer.appendChild(title);
        productContainer.appendChild(price);
        productContainer.appendChild(removeBtn);

        return productContainer;
}