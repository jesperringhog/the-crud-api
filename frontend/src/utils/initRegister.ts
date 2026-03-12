import { registerUser } from "../services/registerService";

export const initRegister = async () => {
    const name = (document.getElementById("registerName") as HTMLInputElement).value;
    const email = (document.getElementById("registerEmail") as HTMLInputElement).value;
    const password = (document.getElementById("registerPassword") as HTMLInputElement).value;

    await registerUser({name, email, password});
}