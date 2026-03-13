import "/src/styles/style.scss";
import { refreshProductList } from "./components/products/refreshProductList";
import { initRegister } from "./utils/initRegister";
import { initLogin } from "./utils/initLogin";
import { initCreateProduct } from "./components/products/initCreateProduct";

document.getElementById("registerForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  initRegister();
});

document.getElementById("loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  initLogin();
});

document.getElementById("createForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  initCreateProduct();
})

document
  .getElementById("showProducts")
  ?.addEventListener("click", refreshProductList);
