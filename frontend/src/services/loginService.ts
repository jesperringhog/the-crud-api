export const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error(error);
  }
};
