import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserAge, setNewUserAge] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const deleteUser = (userId) => {
    axios
      .delete(`http://localhost:8000/api/users/${userId}`)
      .then(() => {
        setData(data.filter((item) => item.UserId !== userId));
        alert(`User with ID ${userId} has been deleted.`);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const updateUser = (userId) => {
    axios
      .put(`http://localhost:8000/api/users/${userId}`, {
        name: name,
        age: age,
      })
      .then((response) => {
        setData(
          data.map((item) => (item.UserId === userId ? response.data : item))
        );
        alert(`User with ID ${userId} has been updated.`);
        setEditingUser(null);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  const createUser = () => {
    axios
      .post("http://localhost:8000/api/users/create", {
        name: newUserName,
        age: newUserAge,
      })
      .then((response) => {
        setData([...data, response.data]);
        alert("User created successfully!");
        setNewUserName("");
        setNewUserAge("");
        setShowCreateForm(false);
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-4xl">
        <div className="flex justify-center p-4">
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Add New User
          </button>
        </div>

        {showCreateForm && (
          <div className="bg-white shadow-md rounded-lg p-4 mt-4 w-full max-w-xs">
            <h3 className="text-xl font-semibold mb-4">Add New User</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createUser();
              }}
            >
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Age</label>
                <input
                  type="number"
                  value={newUserAge}
                  onChange={(e) => setNewUserAge(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-700"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="w-full bg-gray-500 text-white py-2 rounded mt-2 hover:bg-gray-700"
              >
                Close
              </button>
            </form>
          </div>
        )}

        <table className="table-auto w-full mt-6">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">UserId</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Age</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-left">Updated At</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.UserId}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border px-4 py-2">{item.UserId}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.age}</td>
                <td className="border px-4 py-2">{item.created_at}</td>
                <td className="border px-4 py-2">{item.updated_at}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => deleteUser(item.UserId)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setEditingUser(item.UserId);
                      setName(item.name);
                      setAge(item.age);
                    }}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && (
        <div className="bg-white shadow-md rounded-lg p-4 mt-6 w-full max-w-xs">
          <h3 className="text-xl font-semibold mb-4">Update User</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateUser(editingUser);
            }}
          >
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
            >
              Update
            </button>
            <button
              type="button"
              onClick={() => setEditingUser(null)}
              className="w-full bg-gray-500 text-white py-2 rounded mt-2 hover:bg-gray-700"
            >
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
