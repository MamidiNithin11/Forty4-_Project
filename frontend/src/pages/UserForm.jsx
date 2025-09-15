import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/axios";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "", phone: "", role: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => setFadeIn(true), []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      api
        .get(`/users/${id}`)
        .then((res) => {
          if (res.data?.data) setUser(res.data.data);
        })
        .catch((err) =>
          setError(err.response?.data?.error || "Failed to load user")
        )
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const validate = () => {
    if (!user.name.trim()) return "Name is required";
    const re = /^\S+@\S+\.\S+$/;
    if (!user.email || !re.test(user.email)) return "Valid email required";
    if (!user.role) return "Role is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);
    setError(null);

    try {
      if (id) await api.put(`/users/${id}`, user);
      else await api.post(`/users`, user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gray-50 transition-opacity duration-500 ${
        fadeIn ? "opacity-100" : "opacity-0"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-blue-50 rounded-xl shadow-md border border-blue-100"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          {id ? "Edit User" : "Add New User"}
        </h2>

        {error && (
          <div className="text-red-500 mb-4 text-center text-sm font-medium">
            {error}
          </div>
        )}
        {["name", "email", "phone"].map((field) => (
          <div key={field} className="mb-5">
            <label
              htmlFor={field}
              className="block mb-2 text-sm font-medium text-gray-600"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              id={field}
              name={field}
              type={field === "email" ? "email" : "text"}
              value={user[field]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}
        <div className="mb-6">
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-600"
          >
            Role
          </label>
          <select
  id="role"
  name="role"
  value={user.role}
  onChange={handleChange}
  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-gray-800"
>
  <option value="" disabled hidden>
    -- Select Role --
  </option>
  <option value="Admin">👑 Admin</option>
  <option value="Editor">✏️ Editor</option>
  <option value="Viewer">👀 Viewer</option>
</select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {id ? "Update User" : "Create User"}
        </button>
      </form>
    </div>
  );
}
