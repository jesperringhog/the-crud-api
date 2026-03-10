import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user/User.mjs";
import type { UserDTO } from "../models/user/UserDTO.mjs";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const loginToken = req.cookies["login"];

    if (!loginToken) return res.status(401).send("You are not logged in");
    const user = jwt.decode(loginToken);

    if (!user) return res.status(401).send("You are not logged in");
    const foundUser = await User.findOne({ email: (user as UserDTO).email });

    if (foundUser) return next();
    res.status(403).send("You are logged in but unauthorized");
  } catch (error: any) {
    console.error(error);
    res.status(401).send("You are not logged in");
  }
};
