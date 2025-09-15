import { Link } from 'react-router-dom';
import { UserPlus, Users } from 'lucide-react';

export default function Header() {
  return (
    <header className="mb-8 bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row md:justify-between md:items-center transition-all duration-500 hover:shadow-lg">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-wide transform transition-transform duration-500 hover:scale-105">
        User Management Dashboard
      </h1>
      <nav className="mt-4 md:mt-0 flex space-x-6">
        <Link
          to="/"
          className="flex items-center text-blue-600 font-semibold relative group transition-all duration-300"
        >
          <Users className="w-5 h-5 mr-2 transform transition-transform duration-300 group-hover:rotate-12" />
          Users
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link
          to="/add-user"
          className="flex items-center text-blue-600 font-semibold relative group transition-all duration-300"
        >
          <UserPlus className="w-5 h-5 mr-2 transform transition-transform duration-300 group-hover:scale-110" />
          Add User
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </nav>
    </header>
  );
}
