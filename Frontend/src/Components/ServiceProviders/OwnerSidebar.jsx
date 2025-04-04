import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaUsers, FaMoneyBillWave, FaClipboardList, FaCog, FaUser, FaSignOutAlt, FaTimes, FaIdCard } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function OwnerSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navLinks = [
    { to: "/owner-dashboard", icon: FaHome, label: "Overview" },
    { to: "/owner-dashboard/all-customers", icon: FaUsers, label: "Customers" },
    { to: "/owner-dashboard/revenew", icon: FaMoneyBillWave, label: "Revenue" },
    { to: "/owner-dashboard/bookings", icon: FaClipboardList, label: "Bookings" },
    { to: "/owner-dashboard/services", icon: FaCog, label: "Services" },
    { to: "/owner-dashboard/profile", icon: FaUser, label: "Basic Profile" },
    { to: "/owner-dashboard/complete-profile", icon: FaIdCard, label: "Complete Profile" },
  ];

  const handleLogout = () => {
    logout(() => navigate('/login'));
  };

  const LogoutConfirmationModal = () => {
    if (!showLogoutModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 transform transition-all">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Confirm Logout</h3>
            <button 
              onClick={() => setShowLogoutModal(false)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          <div className="mb-6">
            <p className="text-gray-600">Are you sure you want to logout from your account?</p>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors focus:outline-none"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  };

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
            end={link.to === "/owner-dashboard"}
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
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center px-6 py-3 text-red-600 hover:bg-red-50 w-full mt-auto"
        >
          <FaSignOutAlt className="mr-3" /> Logout
        </button>
      </nav>
      <LogoutConfirmationModal />
    </div>
  );
}