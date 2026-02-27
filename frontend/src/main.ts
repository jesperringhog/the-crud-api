import "./style.css";
import { getProducts } from "./services/productService";
import { initCreateProduct } from "./utils/createProduct";
import { createHtmlForProducts } from "./utils/htmlUtil";

document
  .getElementById("productForm")
  ?.addEventListener("submit", (e) => {
    e.preventDefault();

    initCreateProduct();
  });

const products = await getProducts();
createHtmlForProducts(products);
