import axios from "axios";

// Fetch total user count
export const getTotalUsers = async () => {
    const response = await axios.get("/api/users/total-users", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};

// ✅ Add assignTask function
export const assignTask = async (taskId, userId) => {
    const response = await axios.post(
        "/api/admin/assign-task",
        { taskId, userId },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    return response.data;
};

// Fetch all tasks
export const getAllTasks = async () => {
    const response = await axios.get("/api/tasks", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return response.data;
};
