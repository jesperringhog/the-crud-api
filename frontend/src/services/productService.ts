import type { Product } from "../models/Product";

const BASE_URL = "http://localhost:3000/products/";

export const createProduct = async (nameText: string, priceText: number) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: nameText, price: priceText }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch(BASE_URL);
    return await response.json();
  } catch (error) {
    console.error(error);

    return [];
  }
};

export const updateProduct = async (id: number, product: Product) => {
  try {
    const response = await fetch(`${BASE_URL}${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ product }),
    });

    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const removeProduct = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}${id}`, {
      method: "DELETE",
    });

    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};
