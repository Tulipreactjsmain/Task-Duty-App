import Task from "../models/task.js";

export const createNewTask = async (req, res) => {
  const { title, description, tags } = req.body;
  try {
    const task = new Task({
      user: req.session.user._id,
      title,
      description,
      tags,
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.session.user._id });
    if (tasks.length === 0) {
      return res.status(200).json({ message: "You have no tasks yet." });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getSingleTask = async (req, res) => {
  const taskId = req.params.taskId;
  try {
    const task = await Task.findOne({ _id: taskId });
    console.log(task);
    return res.status(200).json(task);
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
