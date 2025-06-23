const Task = require("../models/task.model");

const getAllTasks = async (req, res) => {
  try {
    console.log("getting all task");
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occured while fetching tasks." });
  }
};

const getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findById(id);

    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: `Task with ID ${id} not found.` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving task." });
  }
};

const createTask = async (req, res) => {
  const { title, description, completed } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required." });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      message: "'completed' status must be a boolean (true or false).",
    });
  }
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Not able to add task" });
  }
};

const updateTask = async (req, res) => {
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

  try {
    const { id } = req.params;
    const updatedTask = await Task.update(id, req.body);
    if (updatedTask) {
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: `Task with ID ${id} not found.` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Not able to update task with id: ${id}.` });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.remove(id);
    if (deletedTask) {
      res.json(deletedTask);
    } else {
      res.status(404).json({ message: `Task with ID ${id} not found.` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Not able to delete task with id: ${id}.` });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
