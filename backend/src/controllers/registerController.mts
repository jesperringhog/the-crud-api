import bcrypt from "bcryptjs";
import User, { dbUserToDto, type dbUser } from "../models/user/User.mjs";

export const createUser = async (user: dbUser) => {
    const found = await User.findOne({email: user.email});

    if (found) {
        throw Error(`User with email: ${user.email} already exists`);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

    return await User.create(user);
};
