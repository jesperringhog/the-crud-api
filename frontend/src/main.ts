import "/src/styles/style.scss";
import { refreshProductList } from "./components/products/refreshProductList";
import { refreshOrderList } from "./components/orders/refreshOrderList";
import { initCreateProduct } from "./components/products/initCreateProduct";

document
  .getElementById("productForm")
  ?.addEventListener("submit", (e) => {
    e.preventDefault();

    initCreateProduct();
  });

refreshProductList();
refreshOrderList();