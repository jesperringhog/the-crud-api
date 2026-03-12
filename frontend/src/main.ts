import "/src/styles/style.scss";
import { refreshProductList } from "./components/products/refreshProductList";
import { initCreateProduct } from "./components/products/initCreateProduct";
import { initRegister } from "./utils/initRegister";

document.getElementById("registerForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  initRegister();
});

document.getElementById("productForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  initCreateProduct();
});

refreshProductList();
