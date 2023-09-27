import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectToDB } from "./config/mongoDb.js";
import authRoutes from "./routes/auth.js"

const app = express();
app.use(json());
app.use(cors());
config();
app.disable("x-powered-by");

app.use("/api/v1/auth", authRoutes);

app.use((error, req, res) => {
  const status = error.status || 500;
  const message = error.message || "something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

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
