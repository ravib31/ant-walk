import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Add-Update.css";
import { Alert } from "antd";

function AddTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async () => {
    try {
      const res = await axios.post("http://localhost:8080/tasks", task);
      if (res.data) {
        navigate("/tasks");
      }
      <Alert message="Success Text" type="success" />;
    } catch (err) {
      console.error(err);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "#66BB6A"; // Green
      case "medium":
        return "#FFCA28"; // Amber
      case "high":
        return "#EF5350"; // Red
      default:
        return ""; // Default color
    }
  };

  return (
    <div className="Add-form">
      <h1>Add New Task</h1>

      <input
        type="text"
        placeholder="Title"
        onChange={handleChange}
        name="title"
      />

      <input
        type="text"
        placeholder="Description"
        onChange={handleChange}
        name="description"
      />

      <label className="priority-label">
        <select name="priority" onChange={handleChange} value={task.priority}>
          <option value="">Select Priority</option>
          <option value="low" style={{ color: getPriorityColor("low") }}>
            Low
          </option>
          <option value="medium" style={{ color: getPriorityColor("medium") }}>
            Medium
          </option>
          <option value="high" style={{ color: getPriorityColor("high") }}>
            High
          </option>
        </select>
      </label>

      <button onClick={handleClick}>Add</button>
    </div>
  );
}

export default AddTask;
