import type { CartItem } from "../../models/CartItem";
import { createHtmlForProduct } from "../products/createHtmlProduct";

export const createHtmlForCartItems = (
  cartItems: CartItem[],
) => {
  const cartItemList = document.createElement("ul");

  cartItems.forEach((c) => {
    const cartItem = document.createElement("li");
    
    const productContainer = createHtmlForProduct(c.product);

    const quantity = document.createElement("p");

    quantity.textContent = c.quantity.toString();

    cartItem.appendChild(productContainer);
    cartItem.appendChild(quantity);
    cartItemList.appendChild(cartItem);
  });

  return cartItemList;
};
