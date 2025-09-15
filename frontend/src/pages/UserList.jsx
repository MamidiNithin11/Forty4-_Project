import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../lib/axios';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    api.get('/users')
      .then(res => setUsers(res.data.data || []))
      .catch(err => setError(err.message || 'Failed to fetch'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = (id) => {
    if (!window.confirm('Delete this user?')) return;
    api.delete(`/users/${id}`)
      .then(() => fetchUsers())
      .catch(err => alert(err.response?.data?.error || 'Delete failed'));
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

  return (
    <div className="p-4 sm:p-6 lg:p-10 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">Users</h2>
        <div className="hidden md:block overflow-x-auto bg-white shadow-xl rounded-2xl p-4">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg">
            <thead className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white">
              <tr>
                <th className="px-3 py-3 text-left font-semibold uppercase tracking-wider text-sm sm:text-base">ID</th>
                <th className="px-3 py-3 text-left font-semibold uppercase tracking-wider text-sm sm:text-base">Name</th>
                <th className="px-3 py-3 text-left font-semibold uppercase tracking-wider text-sm sm:text-base">Email</th>
                <th className="px-3 py-3 text-left font-semibold uppercase tracking-wider text-sm sm:text-base">Phone</th>
                <th className="px-3 py-3 text-left font-semibold uppercase tracking-wider text-sm sm:text-base">Role</th>
                <th className="px-3 py-3 text-right font-semibold uppercase tracking-wider text-sm sm:text-base">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              )}
              {users.map((u, idx) => (
                <tr key={u.id} className={`${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-purple-50 transition-colors duration-300`}>
                  <td className="px-3 py-3 text-gray-800 font-medium">{u.id}</td>
                  <td className="px-3 py-3 text-gray-800 font-semibold">{u.name}</td>
                  <td className="px-3 py-3 text-gray-700">{u.email}</td>
                  <td className="px-3 py-3 text-gray-700">{u.phone || '-'}</td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-1 rounded-full text-white text-xs sm:text-sm font-medium ${u.role === "Admin" ? "bg-red-500" : "bg-green-500"}`}>
                      {u.role || '-'}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right flex justify-end gap-2 md:justify-end">
                    <Link to={`/edit-user/${u.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(u.id)} className="text-red-600 hover:text-red-800 font-medium">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden space-y-4">
          {users.length === 0 ? (
            <div className="text-center text-gray-500 py-8">No users found</div>
          ) : (
            users.map(u => (
              <div key={u.id} className="bg-white shadow-lg rounded-2xl p-4 flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-800">{u.name}</span>
                  <span className={`px-2 py-1 rounded-full text-white text-xs font-medium ${u.role === "Admin" ? "bg-red-500" : "bg-green-500"}`}>
                    {u.role || '-'}
                  </span>
                </div>
                <div className="text-gray-700 text-sm">{u.email}</div>
                <div className="text-gray-700 text-sm">{u.phone || '-'}</div>
                <div className="flex justify-end gap-2 mt-2">
                  <Link to={`/edit-user/${u.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(u.id)} className="text-red-600 hover:text-red-800 font-medium">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
