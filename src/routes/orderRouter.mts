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

    const createdOrder = await createOrder(customer);

    res.status(201).json(customer);
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

orderRouter.patch("/:ordernumber", async (req, res) => {
  try {
    const { ordernumber } = req.params;
    const { order }: { order: OrderDTO } = req.body;

    if (+ordernumber === order.orderNumber) {
      const updateSuccess = await updateOrder(order);

      if (updateSuccess) {
        res.status(200).json(updateSuccess);
        return;
      }

      res
      .status(404)
      .json({ message: "Ordernumber in body and parameter does not match" });
    }
    
    res.status(400).json({ message: "Update failed. Body is missing property: orderNumber" });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

orderRouter.delete("/:ordernumber", async (req, res) => {
  try {
    const { ordernumber } = req.params;

    if (ordernumber) {
      const success = await removeOrder(ordernumber);

      if (success) {
        res.status(200).json();
        return;
      }

      res.status(404).json({ message: "Delete failed: order not found" });
    }

    res.status(400).json(`Can not find ordernumber: ${ordernumber}`)
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
