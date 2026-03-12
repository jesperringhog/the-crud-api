import { getProducts } from "../../services/productService";
import { createHtmlProductSection } from "../../utils/htmlUtilProducts";

export const refreshProductList = async () => {
  const products = await getProducts();
  createHtmlProductSection(products);
};
