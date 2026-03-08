import "/src/styles/style.scss";
import { initCreateProduct } from "./utils/initCreateProduct";
import { refreshProductList } from "./utils/refreshProductList";

document
  .getElementById("productForm")
  ?.addEventListener("submit", (e) => {
    e.preventDefault();

    initCreateProduct();
  });

refreshProductList();