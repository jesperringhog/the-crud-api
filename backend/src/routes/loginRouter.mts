import express from "express";
import { login } from "../controllers/loginController.mjs";
import jwt from "jsonwebtoken";
import { dbUserToDto } from "../models/user/User.mjs";
import { orderRouter } from "./orderRouter.mjs";

export const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (
    (!email && email.trim() === "") ||
    (!password && password.trim() === "")
  ) return res.status(400).json({ message: "Invalid login credentials" });

  try {
    const loggedInUser = await login(email, password);

    const loginToken = jwt.sign(
      dbUserToDto(loggedInUser),
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    const expires = new Date();
    expires.setHours(expires.getHours() + 1);

    res.cookie("login", loginToken, {
      httpOnly: true,
      sameSite: "strict",
      expires,
    });

    res.status(200).json({name: loggedInUser.name});
  } catch (error: any) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
});
