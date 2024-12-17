import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaBusinessTime, FaInfoCircle } from 'react-icons/fa';

const Profile = () => {
  // Example owner details
  const ownerDetails = {
    name: 'AJAY SINGHANIYA',
    contact: 'ajay.singhaniya@example.com',
    bio: 'I am the owner of the best hostel in town. We provide affordable rooms and delicious meals to travelers.',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
  };

  // Example business stats
  const businessStats = {
    totalBookings: 120,
    activeCustomers: 95,
    revenue: 2500,
    previousMonthRevenue: 2300,
    profit: 1500,
    roomsBooked: 350,
    customerSatisfaction: 4.7,
  };

  const recentCustomers = [
    { name: 'Alice Johnson', bookingDate: '2024-12-15' },
    { name: 'David Brown', bookingDate: '2024-12-14' },
    { name: 'Emily Davis', bookingDate: '2024-12-13' },
  ];

  const performanceChange = ((businessStats.revenue - businessStats.previousMonthRevenue) / businessStats.previousMonthRevenue) * 100;

  // New state for additional business details
  const [businessDetails, setBusinessDetails] = useState({
    companyName: 'CampusCove Hostel',
    address: '123 Main Street, Cityville, State, 12345',
    businessHours: 'Mon-Fri: 9 AM - 6 PM, Sat-Sun: 10 AM - 4 PM',
    socialLinks: {
      facebook: 'https://facebook.com/campuscove',
      twitter: 'https://twitter.com/campuscove',
      instagram: 'https://instagram.com/campuscove',
    },
    website: 'https://campuscove.com',
    email: 'info@campuscove.com',  // New field
    phoneNumber: '123-456-7890', // New field
    additionalNotes: 'We offer special discounts for students during off-season months.', // New field
  });

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-[90%] mx-auto bg-white p-4 rounded-lg shadow-xl">

        {/* Owner Info */}
        <div className="flex items-center mb-8">
          <img src={ownerDetails.avatar} alt="Owner Avatar" className="w-24 h-24 rounded-full mr-6 shadow-lg" />
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{ownerDetails.name}</h1>
            <p className="text-gray-600">{ownerDetails.contact}</p>
            <p className="text-gray-600 mt-2">{ownerDetails.bio}</p>
          </div>
        </div>

        {/* Business Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-700">Total Bookings</h3>
            <p className="text-2xl font-bold text-blue-600">{businessStats.totalBookings}</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-700">Active Customers</h3>
            <p className="text-2xl font-bold text-blue-600">{businessStats.activeCustomers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-700">Revenue Earned</h3>
            <p className="text-2xl font-bold text-yellow-600">${businessStats.revenue}</p>
          </div>
        </div>

        {/* More Business Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-700">Rooms Booked</h3>
            <p className="text-2xl font-bold text-blue-600">{businessStats.roomsBooked}</p>
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-700">Customer Satisfaction</h3>
            <p className="text-2xl font-bold text-green-600">{businessStats.customerSatisfaction} / 5</p>
          </div>
        </div>

        {/* Performance Compared to the Month Before */}
        <div className="bg-white p-6 rounded-lg shadow-2xl mb-8">
          <h3 className="text-xl font-semibold text-gray-700">Performance Compared to Last Month</h3>
          <p className="text-2xl font-bold text-blue-600">
            {performanceChange > 0 ? '+' : ''}{performanceChange.toFixed(2)}%
          </p>
          <p className="text-sm text-gray-500">This is the percentage change in revenue compared to the previous month.</p>
        </div>

        {/* Profit */}
        <div className="bg-white p-6 rounded-lg shadow-2xl mb-8">
          <h3 className="text-xl font-semibold text-gray-700">Profit</h3>
          <p className="text-2xl font-bold text-green-600">${businessStats.profit}</p>
        </div>

        {/* Business Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-2xl mb-8">
          <h3 className="text-xl font-semibold text-gray-700">Business Details</h3>
          <p className="text-lg text-gray-700 mt-4"><FaMapMarkerAlt className="inline mr-2 text-gray-500" /><strong>Company Name:</strong> {businessDetails.companyName}</p>
          <p className="text-lg text-gray-700"><FaMapMarkerAlt className="inline mr-2 text-gray-500" /><strong>Address:</strong> {businessDetails.address}</p>
          <p className="text-lg text-gray-700"><FaBusinessTime className="inline mr-2 text-gray-500" /><strong>Business Hours:</strong> {businessDetails.businessHours}</p>
          <p className="text-lg text-gray-700"><FaBusinessTime className="inline mr-2 text-gray-500" /><strong>Website:</strong> <a href={businessDetails.website} className="text-blue-600" target="_blank" rel="noopener noreferrer">{businessDetails.website}</a></p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-gray-700">Social Media Links:</h4>
            <ul className="space-y-2">
              <li><a href={businessDetails.socialLinks.facebook} className="text-blue-600" target="_blank" rel="noopener noreferrer"><FaFacebook className="inline mr-2" />Facebook</a></li>
              <li><a href={businessDetails.socialLinks.twitter} className="text-blue-400" target="_blank" rel="noopener noreferrer"><FaTwitter className="inline mr-2" />Twitter</a></li>
              <li><a href={businessDetails.socialLinks.instagram} className="text-pink-600" target="_blank" rel="noopener noreferrer"><FaInstagram className="inline mr-2" />Instagram</a></li>
            </ul>
          </div>
        </div>

        {/* New Fields (Email, Phone Number, Additional Notes) */}
        <div className="bg-white p-6 rounded-lg shadow-2xl mb-8">
          <h3 className="text-xl font-semibold text-gray-700">Contact Info</h3>
          <p className="text-lg text-gray-700 mt-4"><FaEnvelope className="inline mr-2 text-gray-500" /><strong>Email:</strong> {businessDetails.email}</p>
          <p className="text-lg text-gray-700"><FaPhoneAlt className="inline mr-2 text-gray-500" /><strong>Phone Number:</strong> {businessDetails.phoneNumber}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-2xl mb-8">
          <h3 className="text-xl font-semibold text-gray-700">Additional Notes</h3>
          <p className="text-lg text-gray-700"><FaInfoCircle className="inline mr-2 text-gray-500" />{businessDetails.additionalNotes}</p>
        </div>

        {/* Recent Customers */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Customers</h2>
          <div className="bg-white p-6 rounded-lg shadow-2xl">
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

        {/* Add Another Business Button */}
        <div className="flex justify-center mt-8">
          <button className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300">
            Add Another Business
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
