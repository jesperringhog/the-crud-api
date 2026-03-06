import type { Product } from "../models/Product";
import { initUpdateProduct } from "./initUpdateProduct";

export const createHtmlUpdateForm = (
  product: Product,
  productContainer: HTMLElement,
) => {
  const updateForm = document.createElement("form");
  const updateLabel = document.createElement("label");
  const updateInput = document.createElement("input");
  const updateBtn = document.createElement("button");

  updateLabel.textContent = "Change";
  updateInput.placeholder = "product name";
  updateBtn.textContent = "Update";

  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    initUpdateProduct(product, updateInput);
  });

  updateForm.appendChild(updateLabel);
  updateForm.appendChild(updateInput);
  updateForm.appendChild(updateBtn);
  productContainer.appendChild(updateForm);
};
