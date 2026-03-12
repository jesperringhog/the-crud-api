const BASE_URL = "http://localhost:3000/orders/";

// export const createOrder = async (user: string) => {
//   try {
//     const response = await fetch(BASE_URL, {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({ user }),
//     });

//     return await response.json();
//   } catch (error) {
//     console.error(error);
//   }
// };

export const getOrders = async () => {
  try {
    const response = await fetch(BASE_URL);

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
