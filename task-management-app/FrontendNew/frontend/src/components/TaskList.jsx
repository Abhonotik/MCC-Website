import React, { useState, useEffect } from "react";
import { getTasks, updateTask, deleteTask } from "../api/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskData = await getTasks();
        setTasks(taskData);
      } catch (err) {
        setError("Failed to fetch tasks. Please try again later.");
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  const handleToggleComplete = async (task) => {
    try {
      const updatedTask = await updateTask(task._id, { isComplete: !task.isComplete });
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? updatedTask : t))
      );
    } catch (err) {
      setError("Failed to update task. Please try again.");
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError("Failed to delete task. Please try again.");
      console.error(err);
    }
  };

  const completeCount = tasks.filter((task) => task.isComplete).length;
  const incompleteCount = tasks.length - completeCount;

  return (
    <div className="max-w-2xl mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">Your To-Do List</h2>
      {error && <p className="text-black-500 text-center">{error}</p>}
      <p className="mb-4 text-center text-gray-700">
        <strong>Complete:</strong> {completeCount} | <strong>Incomplete:</strong> {incompleteCount}
      </p>
      <ul className="space-y-4">
        {tasks.map((task) => {
          const isExpired = task.dueDate && new Date(task.dueDate) < new Date();
          return (
            <li
              key={task._id}
              className={`p-4 border rounded-lg flex flex-col md:flex-row justify-between items-center shadow-md ${
                isExpired ? "bg-black-100 border-red-400" : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex flex-col">
                <span
                  className={`text-lg font-medium ${
                    task.isComplete ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {task.title} ({task.priority})
                </span>
                {task.dueDate && (
                  <span className="text-sm text-gray-600">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
              <div className="flex space-x-2 mt-2 md:mt-0">
                <button
                  onClick={() => handleToggleComplete(task)}
                  className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
                    task.isComplete ? "bg-green-500 text-white" : "bg-gray-300 text-black"
                  }`}
                >
                  {task.isComplete ? "Mark Incomplete" : "Mark Complete"}
                </button>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="bg-black-500 text-white px-4 py-2 text-sm font-semibold rounded-md hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskList;
