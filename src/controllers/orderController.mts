import { dbOrderToDto, Order, type DbOrder } from "../models/order/Order.mjs";
import type { OrderDTO } from "../models/order/OrderDTO.mjs";
import type { QueryParamValue } from "../models/raw/QueryParamValue.mjs";

export const createOrder = async (customer: string) => {
  const newOrder = await Order.create({
    orderNumber: Date.now(),
    date: +new Date(),
    customer,
    products: [],
  });

  return dbOrderToDto(newOrder);
};

export const getOrders = async (sort: QueryParamValue) => {
  const dbOrders = await Order.find();

  let dtoOrders = dbOrders.map((o) => dbOrderToDto(o));

  if (sort) {
    const direction = sort === "asc" ? 1 : -1;
    dtoOrders.sort((a, b) => (a.orderNumber - b.orderNumber) * direction);
  }

  return dtoOrders;
};

export const updateOrder = async (order: OrderDTO) => {
  const updated = await Order.findOneAndUpdate({ orderNumber: order.orderNumber }, order);

  return updated ? order : false;
}

export const removeOrder = async (ordernumber: string) => {
  const removed = await Order.findOneAndDelete({orderNumber: +ordernumber});
  return removed ? true : false;
}
