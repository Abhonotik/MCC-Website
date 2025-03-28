import React, { useEffect, useState } from "react";
import { getUserProfile } from "../api/api";
import { getTotalUsers, getAllTasks, assignTask } from "../api/adminApi"; // ✅ Use lowercase "a"
import "../styles/AdminPage.css"; // Import CSS file



const AdminPage = () => {
    const [admin, setAdmin] = useState(null);
    const [totalUsers, setTotalUsers] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");

    // States for task assignment
    const [userId, setUserId] = useState("");
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profile = await getUserProfile();
                if (profile?.role === "admin") {
                    setAdmin(profile);

                    const userCount = await getTotalUsers();
                    setTotalUsers(userCount);

                    const allTasks = await getAllTasks();
                    setTasks(allTasks);
                } else {
                    setError("Unauthorized access. You are not an admin.");
                }
            } catch (err) {
                setError("Failed to fetch data. Please try again.");
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleAssignTask = async (e) => {
        e.preventDefault();
        try {
            const taskData = { userId, title, priority, dueDate };
            await assignTask(taskData);
            alert("Task assigned successfully!");
            setUserId("");
            setTitle("");
            setPriority("Medium");
            setDueDate("");
        } catch (error) {
            console.error("Error assigning task:", error);
            alert("Failed to assign task.");
        }
    };

    if (error) return <p className="error-message">{error}</p>;
    if (!admin) return <p className="loading-message">Loading...</p>;

    return (
        <div className="admin-container">
            <h2 className="admin-title">Admin Dashboard</h2>
            <p className="admin-welcome">Welcome, {admin.name} (Admin)</p>

            <div className="admin-section">
                <h3 className="admin-subtitle">Total Users:</h3>
                <p className="admin-data">{totalUsers}</p>
            </div>

            <div className="admin-section">
                <h3 className="admin-subtitle">All Tasks:</h3>
                <ul className="task-list">
                    {tasks.length > 0 ? (
                        tasks.map(task => (
                            <li key={task._id} className="task-item">
                                <span className="task-title">{task.title}</span> - {task.priority} -{" "}
                                {task.completed ? "Completed" : "Incomplete"}
                            </li>
                        ))
                    ) : (
                        <p className="no-tasks">No tasks available.</p>
                    )}
                </ul>
            </div>

            {/* Task Assignment Form */}
            <div className="task-form-container">
                <h3 className="admin-subtitle">Assign Task</h3>
                <form onSubmit={handleAssignTask} className="task-form">
                    <input
                        type="text"
                        placeholder="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                        className="input-field"
                    />
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="input-field"
                    />
                    <select 
                        value={priority} 
                        onChange={(e) => setPriority(e.target.value)} 
                        required
                        className="input-field"
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        className="input-field"
                    />
                    <button 
                        type="submit"
                        className="submit-button"
                    >
                        Assign Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminPage;
