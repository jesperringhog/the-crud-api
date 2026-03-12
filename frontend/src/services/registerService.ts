import type { User } from "../models/User";

export const registerUser = async (user: User) => {
  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    });

    if (response.status === 201) {
      return console.log(`${user.name} is now registered`);
    }
  } catch (error) {
    console.error(error);
  }
};
