import { dbOrderToDto, Order, type DbOrder } from "../models/order/Order.mjs";
import type { OrderDTO } from "../models/order/OrderDTO.mjs";
import type { QueryParamValue } from "../models/raw/QueryParamValue.mjs";

export const createOrder = async (customer: string) => {
  const newDbOrder = await Order.create({
    orderNumber: +Date.now().toString().slice(-8),
    date: +new Date().toISOString().replace(/\D/g, "").slice(0, 8),
    customer,
    cartItems: [],
  });

  return dbOrderToDto(newDbOrder);
};

export const getOrders = async (sort: QueryParamValue, filter: QueryParamValue) => {
  const query: any = {};
  const sortOption: any = {};

  if (sort) {
    sort === "asc" ? sortOption.orderNumber = 1 : sortOption.orderNumber = -1;
  }

  filter ? query.customer = { $regex: filter, $options: "i"} : {};

  const orders = await Order.find(query).sort(sortOption);

  return orders.map(dbOrderToDto);
};

export const updateOrder = async (order: OrderDTO) => {
  const updated = await Order.findOneAndUpdate({ orderNumber: order.orderNumber }, order);

  return updated ? order : false;
}

export const removeOrder = async (ordernumber: string) => {
  const removed = await Order.findOneAndDelete({orderNumber: +ordernumber});
  return removed ? true : false;
}
