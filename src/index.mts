import { config } from "dotenv";
import express, { json } from "express";
import mongoose from "mongoose";

config();

const mongoUri = process.env.MONGO_URI || "";
const port = process.env.PORT || 3000;

if (mongoUri === "") {
  throw Error("Uri in .env is invalid");
}

const app = express();
app.use(json());

app.listen(port, async (error) => {
  if (error) {
    console.error(error);
  }

  try {
    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error(error);
  }
  console.log("The CRUD Api is running");
});
