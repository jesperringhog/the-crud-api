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

    if (customer && customer === "") {
      res.status(400).json({
        message: "Body is missing property: customer, or it's value is empty",
      });
      return;
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
    const { sort } = req.query;

    const orders = await getOrders(sort);

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

    if (+orderNumber === order.orderNumber) {
      const success = await updateOrder(order);

      if (success) {
        res.status(200).json(success);
        return;
      }

      res.status(400).json({
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
        res.status(200).json();
        return;
      }

      res.status(404).json({ message: "Delete failed: order not found" });
    }

    res.status(400).json(`Can not find ordernumber: ${orderNumber}`);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
