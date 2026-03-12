import { model, Schema, type InferSchemaType } from "mongoose";
import type { UserDTO } from "./UserDTO.mjs";

export const userSchema = new Schema({
  name: { type: String, required: true, minLength: 2 },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model("user", userSchema);

export default User;

export type dbUser = InferSchemaType<typeof userSchema>;

export const dbUserToDto = (dbUser: dbUser): UserDTO =>
  ({
    name: dbUser.name,
    email: dbUser.email,
    password: dbUser.password,
  }) satisfies UserDTO;
