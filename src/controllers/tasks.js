const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });

    const savedTask = await newTask.save();

    res.json(savedTask);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(400).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    return res.status(400).json({ message: "Task not found" });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Dato nuevo
    });
    if (!task) return res.status(400).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    return res.status(400).json({ message: "Task not found" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(400).json({ message: "Task not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(400).json({ message: "Task not found" });
  }
};

module.exports = { getTasks, createTask, getTask, updateTask, deleteTask };
