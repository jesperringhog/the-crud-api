import { getProducts } from "../services/productService";
import { createHtmlForProducts } from "./htmlUtil";

export const refreshProductList = async () => {
  const products = await getProducts();
  createHtmlForProducts(products);
};
