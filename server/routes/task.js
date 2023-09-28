import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  createNewTask,
  deleteTask,
  getAllUserTasks,
  updateTaskById,
} from "../controllers/task.js";

const router = express.Router();

router.get("/", verifyToken, getAllUserTasks);
router.post("/create", verifyToken, createNewTask);
router.post("/edit/:taskId", verifyToken, updateTaskById);
router.post("/delete/:taskId", verifyToken, deleteTask);

export default router;
