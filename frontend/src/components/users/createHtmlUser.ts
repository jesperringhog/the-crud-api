import type { User } from "../../models/User";

export const createHtmlForUser = (user: User) => {
    const userInfo = document.createElement("li");
    const name = document.createElement("p");
    const email = document.createElement("p");

    name.textContent = user.name;
    email.textContent = user.email;

    userInfo.appendChild(name);
    userInfo.appendChild(email);

    return userInfo;
}