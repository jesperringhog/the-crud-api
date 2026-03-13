import type { Product } from "../models/Product";

const BASE_URL = "http://localhost:3000/products/";

export const createProduct = async (title: string, price: number) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, price }),
      credentials: "include",
    });

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async () => {
  try {
    const response = await fetch(BASE_URL, {
      credentials: "include",
    });

    if (!response.ok) throw Error(`${response.status}`);

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
      credentials: "include",
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
      credentials: "include",
    });

    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
};
