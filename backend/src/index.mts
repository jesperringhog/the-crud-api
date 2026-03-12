import { config } from "dotenv";
import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieparser from 'cookie-parser';
import { productRouter } from "./routes/productRouter.mjs";
import { orderRouter } from "./routes/orderRouter.mjs";
import { auth } from "./middlewares/auth.mjs";
import { loginRouter } from "./routes/loginRouter.mjs";
import { registerRouter } from "./routes/registerRouter.mjs";

config();

const mongoUri = process.env.MONGO_URI || "";
const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;

if (!mongoUri)
  throw Error(
    "Can not find MONGO_URI in .env, or it's value is empty or invalid",
  );
if (!jwtSecret)
  throw Error(
    "Can not find JWT_SECRET in .env, or its value is empty or invalid",
  );

const app = express();

app.use(json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieparser())

app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.listen(port, async (error) => {
  if (error) console.error(error);

  try {
    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error(error);
  }
  console.log(
    `The CRUD Api is running on port: ${port}, and is connected to database: ${mongoose.connection.name}`,
  );
});
