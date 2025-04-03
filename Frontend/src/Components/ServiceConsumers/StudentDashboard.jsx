import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUtensils, FaDumbbell } from 'react-icons/fa';

export default function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
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
                <button 
                  onClick={() => navigate('/dashboard/hostels')}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
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
                <button 
                  onClick={() => navigate('/dashboard/mess')}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
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
                <button 
                  onClick={() => navigate('/dashboard/gym')}
                  className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
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