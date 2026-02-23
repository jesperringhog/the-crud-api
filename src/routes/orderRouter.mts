import express from "express";
import { getOrders } from "../controllers/orderController.mjs";

export const orderRouter = express.Router();

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