import React, { useState, useEffect } from "react";

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [priority, setPriority] = useState("Medium");

    useEffect(() => {
        // Fetch tasks from the backend
        fetch("/api/tasks")
            .then((res) => res.json())
            .then((data) => setTasks(data));
    }, []);

    const addTask = () => {
        const task = { title: newTask, priority, dueDate: new Date(), completed: false };
        // Send task to backend
        fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        }).then(() => {
            setTasks([...tasks, task]);
            setNewTask("");
        });
    };

    const deleteTask = (id) => {
        // Delete task from backend
        fetch(`/api/tasks/${id}`, { method: "DELETE" }).then(() => {
            setTasks(tasks.filter((task) => task.id !== id));
        });
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <div>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="New Task"
                />
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <button onClick={addTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span>{task.title}</span>
                        <span>{task.priority}</span>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
