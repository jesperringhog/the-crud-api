import type { Product } from "../models/Product";
import { updateProduct } from "../services/productService";
import { refreshProductList } from "./refreshProductList";

export const initUpdateProduct = async (
  product: Product,
  updateInput: HTMLInputElement,
) => {
  const inputText = updateInput.value;
  const updated: Product = { ...product, name: inputText };

  try {
    const success = await updateProduct(product.id, updated);

    if (success) return refreshProductList();

    console.error("Update failed");
  } catch (error) {
    console.error("Something went wrong with update: ", error);
  }
};
