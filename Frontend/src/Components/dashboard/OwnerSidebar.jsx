import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUsers, FaMoneyBillWave, FaClipboardList, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function OwnerSidebar() {
  const { logout } = useAuth();

  const navLinks = [
    { to: "/owner-dashboard", icon: FaHome, label: "Overview" },
    { to: "/owner-dashboard/customers", icon: FaUsers, label: "Customers" },
    { to: "/owner-dashboard/revenue", icon: FaMoneyBillWave, label: "Revenue" },
    { to: "/owner-dashboard/bookings", icon: FaClipboardList, label: "Bookings" },
    { to: "/owner-dashboard/settings", icon: FaCog, label: "Settings" },
    { to: "/owner-dashboard/profile", icon: FaUser, label: "Profile" },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
      <div className="p-5 border-b">
        <h2 className="text-2xl font-bold text-blue-600">CampusCove</h2>
        <p className="text-gray-500">Business Portal</p>
      </div>
      <nav className="mt-8">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                isActive ? 'bg-blue-50 text-blue-600' : ''
              }`
            }
          >
            <link.icon className="mr-3" /> {link.label}
          </NavLink>
        ))}
        <button
          onClick={logout}
          className="flex items-center px-6 py-3 text-red-600 hover:bg-red-50 w-full mt-auto"
        >
          <FaSignOutAlt className="mr-3" /> Logout
        </button>
      </nav>
    </div>
  );
} 