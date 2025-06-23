const fs = require("fs");
const path = require("path");
const tasksFilePath = path.join(__dirname, "..", "task.json");
const writeTasksToFile = (tasks) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

const Task = {
  findAll: () => {
    const fileData = fs.readFileSync(tasksFilePath, "utf8");
    const tasks = JSON.parse(fileData);
    return tasks;
  },
  findById: (id) => {
    const tasks = Task.findAll();
    const task = tasks.find((t) => t.id == id);
    return task;
  },

  create: (newTaskData) => {
    const tasks = Task.findAll();
    const newId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

    const task = {
      id: newId,
      title: newTaskData.title,
      description: newTaskData.description,
      completed: newTaskData.completed || false,
    };

    tasks.push(task);
    writeTasksToFile(tasks);
    return task;
  },

  update: (id, updates) => {
    const tasks = Task.findAll();
    const taskIndex = tasks.findIndex((t) => t.id == id);

    if (taskIndex === -1) {
      return null;
    }

    tasks[taskIndex] = { ...tasks[taskIndex], ...updates };

    writeTasksToFile(tasks);
    return tasks[taskIndex];
  },

  remove: (id) => {
    const tasks = Task.findAll();
    const taskToDelete = Task.findById(id);
    if (!taskToDelete) {
      return null;
    }
    const remainingTasks = tasks.filter((t) => t.id != id);
    writeTasksToFile(remainingTasks);
    return taskToDelete;
  },
};
module.exports = Task;
