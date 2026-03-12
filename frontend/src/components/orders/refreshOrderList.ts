import { getOrders } from "../../services/orderService"
import { createHtmlForOrders } from "../../utils/htmlUtilOrders";

export const refreshOrderList = async () => {
    const orders = await getOrders();
    
    createHtmlForOrders(orders);
}