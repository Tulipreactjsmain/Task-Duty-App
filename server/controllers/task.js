import Task from "../models/task.js";

export const createNewTask = async (req, res) => {
  const { title, description, tags } = req.body;
  try {
    const task = new Task({ user: req.user.id, title, description, tags });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateTaskById = async (req, res) => {
  const taskId = req.params.taskId;
  const { title, description, tags, completed } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { title, description, tags, completed },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task successfully deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};
