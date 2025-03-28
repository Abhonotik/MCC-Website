import React, { useState, useEffect } from "react";
import { getTasks, createTask, deleteTask } from "../api/api";
import "../styles/tasks.css"; // Import CSS file

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const taskData = await getTasks();
            setTasks(taskData);
        } catch (error) {
            console.error("Error fetching tasks:", error);
            alert("Failed to load tasks.");
        }
    };

    const handleCreateTask = async () => {
        if (!newTask.trim()) return;
        try {
            await createTask({ title: newTask, priority: "Medium" });
            setNewTask(""); // Reset input after adding
            fetchTasks();
        } catch (error) {
            console.error("Error creating task:", error);
            alert("Failed to create task.");
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Failed to delete task.");
        }
    };

    return (
        <div className="task-page">
            <h2 className="task-title">Manage Tasks</h2>

            {/* Task Input Form */}
            <div className="task-form">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="New Task"
                    className="task-input"
                />
                <button onClick={handleCreateTask} className="task-button">Add Task</button>
            </div>

            {/* Task List */}
            <ul className="task-list">
                {tasks.length === 0 ? (
                    <p className="no-tasks">No tasks available.</p>
                ) : (
                    tasks.map(task => (
                        <li key={task._id} className="task-item">
                            <span>{task.title} - <strong>{task.priority}</strong></span>
                            <button onClick={() => handleDeleteTask(task._id)} className="delete-button">
                                Delete
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default TaskPage;
