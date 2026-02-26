import { getProducts } from './services/productService';
import './style.css'
import { createHtmlForProducts } from './utils/htmlUtil';

const products = await getProducts();
createHtmlForProducts(products);