import { loginUser } from "../services/loginService";

export const initLogin = async () => {
    const loginContainer = document.getElementById("loginContainer");
    const email = (document.getElementById("loginEmail") as HTMLInputElement).value;
    const password = (document.getElementById("loginPassword") as HTMLInputElement).value;

    const success = await loginUser(email, password);

    if (loginContainer && success) {
        loginContainer.innerHTML = "";
    }
}