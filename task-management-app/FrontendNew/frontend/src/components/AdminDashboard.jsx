import React, { useEffect, useState } from "react";
import { getUserProfile, getTasks } from "../api/api";
import { getTotalUsers } from "../api/adminApi";


const DashboardPage = () => {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [totalUsers, setTotalUsers] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user profile
                const profile = await getUserProfile();
                console.log("Fetched Profile:", profile);
                setUser(profile);

                // Fetch tasks (for regular users)
                if (profile.role === "user") {
                    const userTasks = await getTasks();
                    console.log("Fetched Tasks:", userTasks);
                    setTasks(userTasks);
                }

                // Fetch total users (only if admin)
                if (profile.role === "admin") {
                    const count = await getTotalUsers();
                    console.log("Total Users:", count);
                    setTotalUsers(count);
                }
            } catch (err) {
                setError("Failed to fetch data. Please try again.");
                console.error(err);
            }
        };
        fetchData();
    }, []);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!user) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h2 className="text-xl mb-2">Dashboard</h2>
            <p>Welcome, {user.name}</p>

            {/* User-Specific Section */}
            {user.role === "user" && (
                <>
                    <h3 className="mt-4">Your Tasks:</h3>
                    <ul>
                        {tasks.length > 0 ? (
                            tasks.map(task => (
                                <li key={task._id}>{task.title} - {task.priority}</li>
                            ))
                        ) : (
                            <p>No tasks assigned.</p>
                        )}
                    </ul>
                </>
            )}

            {/* Admin-Specific Section */}
            {user.role === "admin" && (
                <div className="mt-6">
                    <h3>Admin Panel</h3>
                    <p>Total Users: {totalUsers !== null ? totalUsers : "Loading..."}</p>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
