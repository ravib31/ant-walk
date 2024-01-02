import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style.css";
import { Button, message, Flex, Popconfirm } from "antd";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        const res = await axios.get("http://localhost:8080/tasks");
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchAllTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/tasks/${id}`);
      window.location.reload(true);
      message.success("Click on Yes");
    } catch (err) {
      console.log(err);
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilterPriority = (e) => {
    setFilterPriority(e.target.value);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { low: 1, medium: 2, high: 3 };
    const priorityA = priorityOrder[a.priority];
    const priorityB = priorityOrder[b.priority];
    return sortOrder === "asc" ? priorityA - priorityB : priorityB - priorityA;
  });

  const filteredAndSortedTasks = sortedTasks.filter(
    (task) =>
      (filterPriority === "" || task.priority === filterPriority) &&
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="tasks-container">
      <div className="box1">
        <h2 className="header">Your Tasks</h2>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <div className="sort-container">
          <button onClick={handleSort}>
            Sort {sortOrder === "asc" ? "High to Low" : "Low to High"}
          </button>
        </div>
        <div className="filter-container">
          <label></label>
          <select value={filterPriority} onChange={handleFilterPriority}>
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="tasks-list">
        {filteredAndSortedTasks.map((task) => (
          <div className="task" key={task.id}>
            <h2>Title: {task.title}</h2>
            <h5 style={{ color: getPriorityColor(task.priority) }}>
              Priority: {task.priority}
            </h5>
            <p>Description: {task.description}</p>
            {/* <div className="task-buttons-container"> */}
            <Flex gap="small" wrap="wrap" style={{ marginTop: "10px" }}>
              <Button type="primary" ghost>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/update/${task.id}`}
                >
                  Update
                </Link>
              </Button>

              <Button
                type="primary"
                danger
                ghost
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
            </Flex>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
