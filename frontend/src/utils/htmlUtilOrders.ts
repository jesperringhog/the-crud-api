import { createHtmlForCartItems } from "../components/cartItems/createHtmlCartItems";
import { createHtmlForUser } from "../components/users/createHtmlUser";
import type { Order } from "../models/Order";

export const createHtmlForOrders = (orders: Order[]) => {
    const orderList = document.getElementById("orderList");

    if (!orderList) return;
    orderList.innerHTML = "";

    orders.forEach((o) => {
        const orderContainer = document.createElement("li");
        const orderNumber = document.createElement("p");
        const date = document.createElement("h2");
        const userContainer = document.createElement("ul");
        const cartItemContainer = document.createElement("div");
        const removeBtn = document.createElement("button");

        orderContainer.className = "orderContainer";
        orderNumber.textContent = o.orderNumber.toString();
        date.textContent = o.date.toString();

        const userInfo = createHtmlForUser(o.user);

        const cartItemList = createHtmlForCartItems(o.cartItems);

        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        // createHtmlUpdateOrderForm(o, orderContainer);
        // initRemoveOrder(o.orderNumber, removeBtn);

        userContainer.appendChild(userInfo);
        cartItemContainer.appendChild(cartItemList);
        orderContainer.appendChild(orderNumber);
        orderContainer.appendChild(date);
        orderContainer.appendChild(userContainer);
        orderContainer.appendChild(cartItemContainer);
        orderContainer.appendChild(removeBtn);
        orderList.appendChild(orderContainer);
    })
}