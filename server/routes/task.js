import express from "express";
import requireAuth from "../middlewares/requireAuth.js";

import {
  createNewTask,
  deleteTask,
  getUserTasks,
  updateTaskById,
} from "../controllers/task.js";

const router = express.Router();

router.get("/", requireAuth, getUserTasks);
router.post("/create", requireAuth, createNewTask);
router.post("/edit/:taskId", requireAuth, updateTaskById);
router.post("/delete/:taskId", requireAuth, deleteTask);

export default router;
