import express from "express";
import {
  createOrder,
  getOrders,
  removeOrder,
  updateOrder,
} from "../controllers/orderController.mjs";
import type { OrderDTO } from "../models/order/OrderDTO.mjs";

export const orderRouter = express.Router();

orderRouter.post("/", async (req, res) => {
  try {
    const { customer } = req.body;

    if (!customer || customer.trim() === "") {
      return res.status(400).json({
        message: "Body is missing property: customer, or its value is empty",
      });
    }

    const created: OrderDTO = await createOrder(customer);

    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

orderRouter.get("/", async (req, res) => {
  try {
    const { sort, filter } = req.query;

    const orders = await getOrders(sort, filter);

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

orderRouter.patch("/:orderNumber", async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const { order }: { order: OrderDTO } = req.body;

    if (orderNumber && +orderNumber === order.orderNumber) {
      const success = await updateOrder(order);

      if (success) {
        return res.status(200).json(success);
      }

      return res.status(400).json({
        message: "Update failed. Body is missing property: orderNumber",
      });
    }

    res.status(404).json({
      message: `The value for orderNumber in body does not match with parameter: ${orderNumber}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

orderRouter.delete("/:orderNumber", async (req, res) => {
  try {
    const { orderNumber } = req.params;

    if (orderNumber) {
      const success = await removeOrder(orderNumber);

      if (success) {
        return res.status(200).json();
      }

      res.status(404).json(`Delete failed. Can not find ordernumber: ${orderNumber}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
