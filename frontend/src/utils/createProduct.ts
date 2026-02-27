import { createProduct, getProducts } from "../services/productService";
import { createHtmlForProducts } from "./htmlUtil";

export const initCreateProduct = async () => {
    const nameInput = document.getElementById(
      "nameInput",
    ) as HTMLInputElement;

    const priceInput = document.getElementById(
      "priceInput",
    ) as HTMLInputElement;

    let nameText = "";
    if (nameInput) {
      nameText = nameInput.value;
    }

    let priceText = "";
    if (priceInput) {
      priceText = priceInput.value;
    }

    await createProduct(nameText, +priceText);

    if (nameText && priceText) {
        nameInput.value = "";
        priceInput.value = "";
    }

    const products = await getProducts();
    createHtmlForProducts(products);
}