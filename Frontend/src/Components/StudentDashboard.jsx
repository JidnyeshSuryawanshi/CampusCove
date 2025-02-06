import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUtensils, FaDumbbell, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { API_BASE_URL } from '../config';

export default function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'GET',
        credentials: 'include'
      });
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      navigate('/login');

    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-green-600">Student Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900">
                <FaUser className="mr-2" />
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-red-600 hover:text-red-900"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hostel Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <FaHome className="text-3xl text-green-500" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">Hostels</h3>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Find and book hostels</p>
                <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Browse Hostels
                </button>
              </div>
            </div>
          </div>

          {/* Mess Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <FaUtensils className="text-3xl text-green-500" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">Mess</h3>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Explore mess facilities</p>
                <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  View Mess Options
                </button>
              </div>
            </div>
          </div>

          {/* Gym Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <FaDumbbell className="text-3xl text-green-500" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">Gym</h3>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Find nearby gyms</p>
                <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  Explore Gyms
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Bookings Section */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Active Bookings</h3>
            <div className="mt-4">
              <p className="text-gray-500">No active bookings found.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 