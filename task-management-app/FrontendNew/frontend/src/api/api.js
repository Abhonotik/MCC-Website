import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:5000/api", // Ensure this matches your backend URL
});

// Get auth token from localStorage
const getAuthHeader = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

// Centralized error handler
const handleApiError = (error, defaultMessage) => {
    console.error(defaultMessage, error);
    throw new Error(error.response?.data?.message || defaultMessage);
};

// 🟢 **Authentication APIs**

// Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await API.post("/auth/register", userData);
        return response.data;
    } catch (error) {
        handleApiError(error, "Registration failed.");
    }
};

// Login user
export const loginUser = async (userData) => {
    try {
        const response = await API.post("/auth/login", userData);
        return response.data;
    } catch (error) {
        handleApiError(error, "Login failed.");
    }
};

// Fetch user profile
export const getUserProfile = async () => {
    try {
        const response = await API.get("/users/profile", getAuthHeader());
        return response.data;
    } catch (error) {
        handleApiError(error, "Failed to fetch user profile.");
    }
};

// 🟡 **Admin API**
export const getTotalUsers = async () => {
    try {
        const response = await API.get("/users/total-users", getAuthHeader());
        return response.data.totalUsers;
    } catch (error) {
        handleApiError(error, "Error fetching total users.");
    }
};

// 🔵 **Task Management APIs**

// Fetch all tasks
export const getTasks = async () => {
    try {
        const response = await API.get("/tasks", getAuthHeader());
        return response.data;
    } catch (error) {
        handleApiError(error, "Error fetching tasks.");
    }
};

// Create a task
export const createTask = async (taskData) => {
    try {
        const response = await API.post("/tasks", taskData, getAuthHeader());
        return response.data;
    } catch (error) {
        handleApiError(error, "Error creating task.");
    }
};

// Update a task
export const updateTask = async (taskId, updatedTask) => {
    try {
        const response = await API.put(`/tasks/${taskId}`, updatedTask, getAuthHeader());
        return response.data;
    } catch (error) {
        handleApiError(error, "Error updating task.");
    }
};

// Delete a task
export const deleteTask = async (taskId) => {
    try {
        await API.delete(`/tasks/${taskId}`, getAuthHeader());
    } catch (error) {
        handleApiError(error, "Error deleting task.");
    }
};

// 🔥 **Export all API functions**
export default {
    registerUser,
    loginUser,
    getUserProfile,
    getTotalUsers,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
