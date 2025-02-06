import React, { useState } from "react";
import {
  FaClipboardList,
  FaUsers,
  FaMoneyBillWave,
  FaPlus,
  FaCheckCircle,
  FaListAlt,
  FaSearch,
  FaTrashAlt,
  FaBuilding,
  FaEdit,
  FaCalendarAlt,
  FaUser,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function BusinessDashboard() {
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');

  const [orders, setOrders] = useState([
    { id: 1, customer: "John Doe", type: "Hotel", amount: "$200", status: "Pending", date: "2024-12-01" },
    { id: 2, customer: "Jane Smith", type: "Gym", amount: "$150", status: "Completed", date: "2024-12-02" },
    { id: 3, customer: "Sam Wilson", type: "Ice Cream", amount: "$25", status: "Pending", date: "2024-12-03" },
  ]);

  const [customers, setCustomers] = useState([
    { id: 1, name: "John Doe", contact: "john@example.com", phone: "123-456-7890", address: "123 Main St", orders: 3 },
    { id: 2, name: "Jane Smith", contact: "jane@example.com", phone: "987-654-3210", address: "456 Oak St", orders: 5 },
    { id: 3, name: "Sam Wilson", contact: "sam@example.com", phone: "555-555-5555", address: "789 Pine St", orders: 2 },
  ]);

  const [newCustomer, setNewCustomer] = useState({
    name: "",
    contact: "",
    phone: "",
    address: "",
  });

  const [newOrder, setNewOrder] = useState({
    customer: "",
    type: "",
    amount: "",
    status: "Pending",
    date: "",
  });

  const handlePaymentReceived = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "Completed" } : order
      )
    );
  };

  const handleDeleteOrder = (orderId) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const newCustomerData = {
      ...newCustomer,
      id: customers.length + 1,
      orders: 0,
    };
    setCustomers((prev) => [...prev, newCustomerData]);
    setNewCustomer({ name: "", contact: "", phone: "", address: "" });
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    const newOrderData = {
      ...newOrder,
      id: orders.length + 1,
    };
    setOrders((prev) => [...prev, newOrderData]);
    setNewOrder({ customer: "", type: "", amount: "", status: "Pending", date: "" });
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
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
              <h1 className="text-2xl font-bold text-green-600">
                {userType === 'hostelOwner' ? 'Hostel Dashboard' : 
                 userType === 'messOwner' ? 'Mess Dashboard' : 'Gym Dashboard'}
              </h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-red-600 hover:text-red-900"
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
          {/* Profile Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <FaUser className="text-3xl text-green-500" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">Profile</h3>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Manage your business profile</p>
              </div>
            </div>
          </div>

          {/* Settings Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <FaCog className="text-3xl text-green-500" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">Settings</h3>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">Configure your preferences</p>
              </div>
            </div>
          </div>

          {/* Bookings Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <FaClipboardList className="text-3xl text-green-500" />
                <h3 className="ml-3 text-lg font-medium text-gray-900">Bookings</h3>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">View and manage bookings</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900">Overview</h3>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
              </div>
              <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden">
                <dt className="text-sm font-medium text-gray-500 truncate">Active Customers</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">0</dd>
              </div>
              <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden">
                <dt className="text-sm font-medium text-gray-500 truncate">Revenue</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">₹0</dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
