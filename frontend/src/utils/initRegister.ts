import { registerUser } from "../services/registerService";

export const initRegister = async () => {
    const form = document.getElementById("registerForm");
    const name = (document.getElementById("registerName") as HTMLInputElement).value;
    const email = (document.getElementById("registerEmail") as HTMLInputElement).value;
    const password = (document.getElementById("registerPassword") as HTMLInputElement).value;

    const success = await registerUser({name, email, password});

    if (form && success) {
        form.innerHTML = "";
    }
}