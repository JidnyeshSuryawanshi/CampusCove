import React from 'react';

const ProfilePage = () => {
  // Example owner details
  const ownerDetails = {
    name: 'John Doe',
    contact: 'john.doe@example.com',
    bio: 'I am the owner of the best hostel in town. We provide affordable rooms and delicious meals to travelers.',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  };

  // Example business stats
  const businessStats = {
    totalBookings: 120,
    activeCustomers: 95,
    revenue: 2500,
  };

  // Example recent customers
  const recentCustomers = [
    { name: 'Alice Johnson', bookingDate: '2024-12-15' },
    { name: 'David Brown', bookingDate: '2024-12-14' },
    { name: 'Emily Davis', bookingDate: '2024-12-13' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Profile Header */}
        <div className="flex items-center mb-8">
          <img src={ownerDetails.avatar} alt="Owner Avatar" className="w-24 h-24 rounded-full mr-6" />
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{ownerDetails.name}</h1>
            <p className="text-gray-600">{ownerDetails.contact}</p>
            <p className="text-gray-600 mt-2">{ownerDetails.bio}</p>
          </div>
        </div>

        {/* Business Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Total Bookings</h3>
            <p className="text-2xl font-bold text-blue-600">{businessStats.totalBookings}</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Active Customers</h3>
            <p className="text-2xl font-bold text-green-600">{businessStats.activeCustomers}</p>
          </div>
          <div className="bg-yellow-50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700">Revenue</h3>
            <p className="text-2xl font-bold text-yellow-600">${businessStats.revenue}</p>
          </div>
        </div>

        {/* Recent Customers */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Customers</h2>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <ul className="space-y-4">
              {recentCustomers.map((customer, index) => (
                <li key={index} className="flex justify-between items-center">
                  <p className="text-lg font-medium text-gray-700">{customer.name}</p>
                  <span className="text-sm text-gray-500">{customer.bookingDate}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
