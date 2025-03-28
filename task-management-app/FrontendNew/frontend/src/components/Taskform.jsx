import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ setTasks }) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium"); // Default priority
  const [dueDate, setDueDate] = useState(""); // Due date

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/tasks", { title: task, priority, dueDate })
      .then(response => {
        setTasks(prevTasks => [...prevTasks, response.data]);
        setTask("");
        setPriority("Medium");
        setDueDate("");
      })
      .catch(error => console.error("Error adding task:", error));
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter new task"
        required
        className="border p-2 w-full mb-2 rounded"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;