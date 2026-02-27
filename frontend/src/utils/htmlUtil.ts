import type { Product } from "../models/Product";

export const createHtmlForProducts = (products: Product[]) => {
    const productList = document.getElementById("productList");

    if (productList === null) return;
    productList.innerHTML = "";

    products.forEach((p) => {
        const productContainer = document.createElement("li");
        const id = document.createElement("p");
        const name = document.createElement("h2");
        const price = document.createElement("h4");

        productContainer.className = "productContainer";
        id.innerHTML = p.id.toString();
        name.innerHTML = p.name;
        price.innerHTML = p.price.toString();

        productContainer.appendChild(id);
        productContainer.appendChild(name);
        productContainer.appendChild(price);
        productList.appendChild(productContainer);
    })
}