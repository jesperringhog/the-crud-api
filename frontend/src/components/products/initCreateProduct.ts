import { refreshProductList } from "../../components/products/refreshProductList";
import { createProduct } from "../../services/productService";

export const initCreateProduct = async () => {
  const titleInput = (document.getElementById("titleInput") as HTMLInputElement);
  const priceInput = (document.getElementById("priceInput") as HTMLInputElement);

  let userTitleInput = "";
  userTitleInput = titleInput.value;

  let userPriceInput = "";
  userPriceInput = priceInput.value;

  await createProduct(userTitleInput, +userPriceInput);

  if (userTitleInput && userPriceInput) {
    titleInput.value = "";
    priceInput.value = "";
  }

  refreshProductList();
};
