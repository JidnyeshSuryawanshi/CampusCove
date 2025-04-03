import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaBook, FaUtensils, FaDumbbell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function StudentSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => navigate('/login'));
  };

  const navLinks = [
    { to: "/dashboard", icon: FaHome, label: "Dashboard" },
    { to: "/dashboard/hostels", icon: FaBook, label: "Hostels" },
    { to: "/dashboard/mess", icon: FaUtensils, label: "Mess Services" },
    { to: "/dashboard/gym", icon: FaDumbbell, label: "Gym" },
    { to: "/dashboard/profile", icon: FaUser, label: "Profile" },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
      <div className="p-5 border-b">
        <h2 className="text-2xl font-bold text-green-600">CampusCove</h2>
        <p className="text-gray-500">Student Portal</p>
      </div>
      <nav className="mt-8">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 ${
                isActive ? 'bg-green-50 text-green-600' : ''
              }`
            }
          >
            <link.icon className="mr-3" /> {link.label}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center px-6 py-3 text-red-600 hover:bg-red-50 w-full mt-auto"
        >
          <FaSignOutAlt className="mr-3" /> Logout
        </button>
      </nav>
    </div>
  );
} 