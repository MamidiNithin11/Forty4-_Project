import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserList from "./pages/UserList";
import UserForm from "./pages/UserForm";
import Header from "./components/Header"

export default function App() {
  return (
    <Router>
      <div className="min-h-screen p-4 bg-gray-100">
      <Header/>
        <main>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/add-user" element={<UserForm />} />
            <Route path="/edit-user/:id" element={<UserForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

