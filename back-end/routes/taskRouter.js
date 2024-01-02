const express = require('express');
const taskRouter = express.Router();
const tasksController = require('../controllers/taskController.js');

taskRouter.get("/", tasksController.getAllTasks);
taskRouter.get("/:id", tasksController.getTaskById);
taskRouter.post("/", tasksController.createTask);
taskRouter.delete("/:id", tasksController.deleteTask);
taskRouter.put("/:id", tasksController.updateTask);

module.exports = taskRouter;
