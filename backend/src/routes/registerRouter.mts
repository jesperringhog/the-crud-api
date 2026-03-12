import express, { response } from "express";
import { createUser } from "../controllers/registerController.mjs";
import { dbUserToDto } from "../models/user/User.mjs";

export const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !password ||
    name.trim() === "" ||
    email.trim() === "" ||
    password.trim() === ""
  )
    return res.status(400).json({ message: "Invalid credentials" });

  try {
    const newUser = await createUser({ name, email, password });

    const newUserDto = dbUserToDto(newUser);

    res.status(201).json(newUserDto);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
