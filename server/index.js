import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectToDB } from "./config/mongoDb.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/task.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import passport from "./config/passportConfig.js";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

config();
const app = express();
const allowedOrigins = ["http://localhost:5173", process.env.SITE_URL];
const mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collection: "sessions",
  mongooseConnection: mongoose.connection,
});

app.use(json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.disable("x-powered-by");
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(
  session({
    name: "TaskDuty.cookie",
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: mongoStore,
    cookie: {
      maxAge: 86400000,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
    genid: (req) => {
      return uuidv4();
    },
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
