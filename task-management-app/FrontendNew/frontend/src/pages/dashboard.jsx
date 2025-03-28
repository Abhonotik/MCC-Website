import React, { useEffect, useState } from "react";
import { getUserProfile, getTasks, updateTask, deleteTask, createTask } from "../api/api";
import "../styles/dashboard.css";

const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [completedCount, setCompletedCount] = useState(0);
    const [incompleteCount, setIncompleteCount] = useState(0);
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profile = await getUserProfile();
                console.log("Fetched Profile:", profile);
                setUser(profile);
                const userTasks = await getTasks();
                console.log("Fetched Tasks:", userTasks);
                setTasks(userTasks);
                updateTaskCounts(userTasks);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const updateTaskCounts = (tasks) => {
        const completed = tasks.filter(task => task.completed).length;
        setCompletedCount(completed);
        setIncompleteCount(tasks.length - completed);
    };

    const handleTaskUpdate = async (taskId, updatedData) => {
        try {
            const updatedTask = await updateTask(taskId, updatedData);
            const updatedTasks = tasks.map(task => task._id === taskId ? updatedTask : task);
            setTasks(updatedTasks);
            updateTaskCounts(updatedTasks);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const handleTaskDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            const updatedTasks = tasks.filter(task => task._id !== taskId);
            setTasks(updatedTasks);
            updateTaskCounts(updatedTasks);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const newTask = await createTask({ title, priority, dueDate });
            const updatedTasks = [...tasks, newTask];
            setTasks(updatedTasks);
            updateTaskCounts(updatedTasks);
            setTitle("");
            setPriority("Medium");
            setDueDate("");
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const isTaskExpired = (dueDate) => new Date(dueDate) < new Date();

    if (!user) return <p>Loading...</p>;

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-header">User Dashboard</h2>
            <div className="user-info">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>

            <div className="task-stats">
                <p>✅ Completed: {completedCount}</p>
                <p>❌ Incomplete: {incompleteCount}</p>
            </div>

            <form onSubmit={handleCreateTask} className="task-form">
                <input type="text" placeholder="Task Title" value={title} onChange={e => setTitle(e.target.value)} required />
                <select value={priority} onChange={e => setPriority(e.target.value)} required>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} required />
                <button type="submit">Create Task</button>
            </form>

            <h3>Your Tasks:</h3>
            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task._id} className={`task-item ${task.completed ? "task-completed" : isTaskExpired(task.dueDate) ? "task-expired" : "task-incomplete"}`}>
                        <div>
                            <p><strong>{task.title}</strong> - {task.priority}</p>
                            <p>📅 Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                            <p>📌 Status: {task.completed ? "Completed ✅" : "Incomplete ❌"}</p>
                        </div>
                        <div className="task-buttons">
                            <button onClick={() => handleTaskUpdate(task._id, { completed: !task.completed })}>{task.completed ? "Mark Incomplete" : "Mark Complete"}</button>
                            <button onClick={() => handleTaskDelete(task._id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardPage;
