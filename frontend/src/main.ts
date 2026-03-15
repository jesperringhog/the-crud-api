import "/src/styles/style.scss";
import { refreshProductList } from "./components/products/refreshProductList";
import { initRegister } from "./utils/initRegister";
import { initLogin } from "./utils/initLogin";
import { initCreateProduct } from "./components/products/initCreateProduct";
import { io } from "socket.io-client";
import type { ListResponse } from "./models/ListResponse";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log(socket.connected);

  if (socket.connected) {
    socket.emit("getProductList", "Jesper");
  }
});

socket.on("gotProductList", (result: ListResponse) => {
  console.log("Got list from server", result);
});

document.getElementById("registerForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  initRegister();
});

document.getElementById("loginForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  initLogin();
});

document.getElementById("createForm")?.addEventListener("submit", (e) => {
  e.preventDefault();
  initCreateProduct();
});

document
  .getElementById("showProducts")
  ?.addEventListener("click", refreshProductList);
