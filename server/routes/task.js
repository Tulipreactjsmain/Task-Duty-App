import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  createNewTask,
  deleteTask,
  getUserTasks,
  updateTaskById,
} from "../controllers/task.js";

const router = express.Router();

router.get("/", verifyToken, getUserTasks);
router.post("/create", verifyToken, createNewTask);
router.post("/edit/:taskId", verifyToken, updateTaskById);
router.post("/delete/:taskId", verifyToken, deleteTask);

export default router;
