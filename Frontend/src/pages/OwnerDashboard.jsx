import React from 'react';
import Stats from '../components/dashboard/Stats';
import ActivityList from '../components/dashboard/ActivityList';

export default function OwnerDashboard() {
  const statsData = [
    {
      title: "Total Revenue",
      value: "50,000",
      prefix: "₹",
      colorClass: "text-blue-600"
    },
    {
      title: "Active Customers",
      value: "25",
      colorClass: "text-blue-600"
    },
    {
      title: "Pending Bookings",
      value: "5",
      colorClass: "text-blue-600"
    }
  ];

  const recentBookings = [
    {
      title: "Customer #1",
      time: "Booked 2 days ago",
      status: "Active",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      title: "Customer #2",
      time: "Booked 2 days ago",
      status: "Active",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      title: "Customer #3",
      time: "Booked 2 days ago",
      status: "Active",
      statusColor: "bg-green-100 text-green-800"
    }
  ];

  const quickActions = [
    {
      title: "Add New Listing",
      colorClass: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "View Reports",
      colorClass: "bg-green-600 hover:bg-green-700"
    },
    {
      title: "Manage Settings",
      colorClass: "bg-purple-600 hover:bg-purple-700"
    }
  ];

  return (
    <div>
      <Stats items={statsData} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          <ActivityList 
            title="Recent Bookings" 
            activities={recentBookings} 
          />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className={`w-full text-white px-4 py-2 rounded ${action.colorClass}`}
              >
                {action.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 