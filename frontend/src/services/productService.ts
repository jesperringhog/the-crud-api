const BASE_URL = "http://localhost:3000/products";

export const getProducts = async () => {
  try {
    const response = await fetch(BASE_URL);
    return await response.json();

  } catch (error) {
    console.error(error);

    return [];
  }
};
