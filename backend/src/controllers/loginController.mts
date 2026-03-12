import bcrypt from "bcryptjs";
import User from "../models/user/User.mjs";

export const login = async (email: string, password: string) => {
  const foundUser = await User.findOne({ email });

  if (!foundUser) throw Error(`Could not find user with email: ${email}`);

  const success = await bcrypt.compare(password, foundUser.password);

  if (!success) throw Error("Invalid credentials");

  return foundUser;
};
