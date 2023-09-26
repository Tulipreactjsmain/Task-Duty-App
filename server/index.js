import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectToDB } from "./config/mongoDb.js";

const app = express();
app.use(json());
app.use(cors());
config();
app.disable("x-powered-by");

            

const PORT = process.env.PORT || 3000;

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
