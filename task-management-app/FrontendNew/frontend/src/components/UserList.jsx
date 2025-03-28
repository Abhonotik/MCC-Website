import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User List</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border border-gray-300">
              <td className="border border-gray-300 p-2">{user._id}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
