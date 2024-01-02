const pool = require("../models/db.js");

exports.getAllTasks = async (_req, res) => {
  try {
    const query = "SELECT * FROM tasks";
    const [rows] = await pool.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const query = "SELECT * FROM tasks WHERE id = ?";
    const [rows] = await pool.query(query, [taskId]);

    if (rows.length === 1) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const query =
      "INSERT INTO tasks (`title`, `description`, `priority`) VALUES (?, ?, ?)";
    const values = [title, description, priority];
    const response = await pool.query(query, values);

    if (response[0].affectedRows === 1) {
      res
        .status(201)
        .json({ success: true, message: "Task added successfully" });
    } else {
      res.status(500).json({ success: false, message: "Failed to add task" });
    }
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const query = "DELETE FROM tasks WHERE id = ?";
    const response = await pool.query(query, [taskId]);

    if (response[0].affectedRows === 1) {
      res
        .status(200)
        .json({ success: true, message: "Task deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Task not found" });
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, priority } = req.body;
    const query =
      "UPDATE tasks SET `title`=?, `description`=?, `priority`=? WHERE id = ?";
    const values = [title, description, priority, taskId];
    const response = await pool.query(query, values);

    if (response[0].affectedRows === 1) {
      res
        .status(200)
        .json({ success: true, message: "Task updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Task not found" });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
