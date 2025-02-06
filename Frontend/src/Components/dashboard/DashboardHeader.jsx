import React from 'react';
import { FaSearch, FaBell, FaPlus } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function DashboardHeader() {
  const { user } = useAuth();
  const isOwner = user?.userType.includes('Owner');

  return (
    <header className="bg-white shadow-sm sticky top-0">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className={`pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-${isOwner ? 'blue' : 'green'}-500`}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isOwner && (
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <FaPlus className="mr-2" /> Add Listing
            </button>
          )}
          <button className="relative p-2 text-gray-400 hover:text-gray-600">
            <FaBell className="text-xl" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-3">
            <img
              src={`https://ui-avatars.com/api/?name=${user?.username || 'User'}`}
              alt="Profile"
              className="h-8 w-8 rounded-full"
            />
            <span className="font-medium text-gray-700">{user?.username}</span>
          </div>
        </div>
      </div>
    </header>
  );
} 