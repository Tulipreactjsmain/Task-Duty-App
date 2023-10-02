import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectToDB } from "./config/mongoDb.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/task.js";
import session from "express-session";
import passport from "./config/passportConfig.js";

const app = express();
app.use(json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
config();
app.disable("x-powered-by");

app.use(
  session({
    secret: "your-secret-key",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.use((error, req, res, next) => {
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
