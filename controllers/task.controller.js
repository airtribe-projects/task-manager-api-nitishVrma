const Task = require("../models/task.model");

const getAllTasks = (req, res) => {
  const tasks = Task.findAll();

  res.json(tasks);
};

const getTaskById = (req, res) => {
  const id = req.params.id;
  const task = Task.findById(id);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: `Task with ID ${id} not found.` });
  }
};

const createTask = (req, res) => {
  const { title, description, completed } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required." });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res
      .status(400)
      .json({
        message: "'completed' status must be a boolean (true or false).",
      });
  }

  const newTask = Task.create(req.body);
  res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const { title, description, completed } = req.body;

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      message: "'completed' status must be a boolean (true or false).",
    });
  }

  if (title !== undefined && title.trim() === "") {
    return res.status(400).json({ message: "Title cannot be empty." });
  }

  if (description !== undefined && description.trim() === "") {
    return res.status(400).json({ message: "Description cannot be empty." });
  }

  const { id } = req.params;
  const updatedTask = Task.update(id, req.body);

  if (updatedTask) {
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: `Task with ID ${id} not found.` });
  }
};

const deleteTask = (req, res) => {
  const { id } = req.params;
  const deletedTask = Task.remove(id);
  if (deletedTask) {
    res.json(deletedTask);
  } else {
    res.status(404).json({ message: `Task with ID ${id} not found.` });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
