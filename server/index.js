import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectToDB } from "./config/mongoDb.js";

const app = express();
app.use(json());
app.use(cors());
config();
app.disable("x-powered-by");

const PORT = process.env.PORT || 8000;

app.use((req, res, next) => {
  try {
    throw new Error("This is a simulated error");
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({ error: "Internal server error" });
});

connectToDB()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`server connected to port ${PORT}`);
      });
    } catch (error) {
      console.log("Could not connect to server ");
    }
  })
  .catch(() => {
    console.log("Invalid data connection ");
  });
