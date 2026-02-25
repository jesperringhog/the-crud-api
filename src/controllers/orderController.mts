import { dbOrderToDto, Order, type DbOrder } from "../models/order/Order.mjs";
import type { OrderDTO } from "../models/order/OrderDTO.mjs";
import type { QueryParamValue } from "../models/raw/QueryParamValue.mjs";

export const createOrder = async (customer: string) => {
  const created = await Order.create({
    orderNumber: Date.now(),
    date: +new Date(),
    customer,
    products: [],
  });

  return dbOrderToDto(created);
};

export const getOrders = async (sort: QueryParamValue, filter: QueryParamValue) => {
  const fromDb = await Order.find();

  let dtos = fromDb.map((o) => dbOrderToDto(o));

  if (sort) {
    const direction = sort === "asc" ? 1 : -1;
    dtos.sort((a, b) => (a.orderNumber - b.orderNumber) * direction);
  }

  if (filter) {
    dtos = dtos.filter((o) => o.customer.toLowerCase().includes(filter.toString()));
  }

  return dtos;
};

export const updateOrder = async (order: OrderDTO) => {
  const updated = await Order.findOneAndUpdate({ orderNumber: order.orderNumber }, order);

  return updated ? order : false;
}

export const removeOrder = async (ordernumber: string) => {
  const removed = await Order.findOneAndDelete({orderNumber: +ordernumber});
  return removed ? true : false;
}
