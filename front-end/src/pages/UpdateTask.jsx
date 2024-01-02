import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const taskId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/tasks/${taskId}`
        );

        if (response.data && response.data.id && response.data.title) {
          setTask(response.data);
        } else {
          console.error("Invalid response data:", response.data);
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.put(`http://localhost:8080/tasks/${taskId}`, task);
      console.log(res, "res");
      if (res.data) {
        navigate("/tasks"); // Use navigate here
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  return (
    <div className="Add-form">
      <h1 className="">Update The Task</h1>
     
      <input
        type="text"
        placeholder="Title"
        onChange={handleChange}
        name="title"
        value={task.title}
      />
      <input
        type="text"
        placeholder="Description"
        onChange={handleChange}
        name="description"
        value={task.description}
      />
      <label className="priority-label">
        <select name="priority" onChange={handleChange} value={task.priority}>
          <option value="">Select Priority</option>
          {["low", "medium", "high"].map((priority) => (
            <option key={priority} value={priority}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleClick} className="formButton">
        Update
      </button>
    </div>
  );
}

export default UpdateTask;
