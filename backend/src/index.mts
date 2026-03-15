import { config } from "dotenv";
import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieparser from "cookie-parser";
import { productRouter } from "./routes/productRouter.mjs";
import { orderRouter } from "./routes/orderRouter.mjs";
import { auth } from "./middlewares/auth.mjs";
import { loginRouter } from "./routes/loginRouter.mjs";
import { registerRouter } from "./routes/registerRouter.mjs";
import { Server } from "socket.io";
import { ioOnConnection } from "./sockets/ioOnConnection.mjs";
import { createServer } from "node:http";
import { log } from "node:console";

config();

const mongoUri = process.env.MONGO_URI || "";
const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

if (!mongoUri)
  throw Error(
    "Can not find MONGO_URI in .env, or it's value is empty or invalid",
  );
if (!jwtSecret)
  throw Error(
    "Can not find JWT_SECRET in .env, or its value is empty or invalid",
  );

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: frontendUrl,
  },
});

app.use(json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieparser());

app.get("/", (_, res) => {
  res.status(200).json({ message: "Alive" });
});

app.use("/products", auth, productRouter);
app.use("/orders", orderRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

// app.listen(port, async (error) => {
//   if (error) console.error(error);

//   try {
//     await mongoose.connect(mongoUri);
//   } catch (error) {
//     console.error(error);
//   }
//   console.log(
//     `The CRUD Api is running on port: ${port}, and is connected to database: ${mongoose.connection.name}`,
//   );
// });

ioOnConnection(io);

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
