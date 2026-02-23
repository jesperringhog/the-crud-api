import { dbOrderToDto, Order } from "../models/order/Order.mjs";
import type { QueryParamValue } from "../models/raw/QueryParamValue.mjs";

export const getOrders = async (sort: QueryParamValue) => {
  const dbOrders = await Order.find();

  let dtoOrders = dbOrders.map((o) => dbOrderToDto(o));

  if (sort) {
    const direction = sort === "asc" ? 1 : -1;
    dtoOrders.sort((a, b) => (a.orderNumber - b.orderNumber) * direction);
  }

  return dtoOrders;
};
