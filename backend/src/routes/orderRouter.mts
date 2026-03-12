import express from "express";
import {
  getOrders,
  removeOrder,
  updateOrder,
} from "../controllers/orderController.mjs";
import type { OrderDTO } from "../models/order/OrderDTO.mjs";

export const orderRouter = express.Router();

// orderRouter.post("/", async (req, res) => {
//   const { user } = req.body;

//   if (!user || user.trim() === "")
//     return res.status(400).json({
//       message: "Body is missing property: user, or its value is empty",
//     });

//   try {
//     const created: OrderDTO = await createOrder(user);

//     res.status(201).json(created);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error);
//   }
// });

orderRouter.get("/", async (req, res) => {
  const { sort, filter } = req.query;

  try {
    const orders = await getOrders(sort, filter);

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

orderRouter.patch("/:orderNumber", async (req, res) => {
  const { orderNumber } = req.params;
  const { order }: { order: OrderDTO } = req.body;

  try {
    if (orderNumber && +orderNumber === order.orderNumber) {
      const success = await updateOrder(order);

      if (!success)
        return res.status(400).json({
          message: "Update failed. Body is missing property: orderNumber",
        });

      return res.status(200).json(success);
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
  const { orderNumber } = req.params;
  
  try {
    if (!orderNumber) return res
        .status(404)
        .json(`Delete failed. Can not find ordernumber: ${orderNumber}`);

      const success = await removeOrder(orderNumber);

      if (success) res.status(200).json();
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
