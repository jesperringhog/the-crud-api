import type { Product } from "../models/Product";

export const createHtmlForProducts = (products: Product[]) => {
    const app = document.getElementById("app");

    if (app === null) return;

    products.forEach((p) => {
        const itemNumber = document.createElement("p");
        const name = document.createElement("h2");
        const price = document.createElement("h4");

        itemNumber.innerHTML = p.itemNumber.toString();
        name.innerHTML = p.name;
        price.innerHTML = p.price.toString();

        app.appendChild(itemNumber);
        app.appendChild(name);
        app.appendChild(price);
    })
}