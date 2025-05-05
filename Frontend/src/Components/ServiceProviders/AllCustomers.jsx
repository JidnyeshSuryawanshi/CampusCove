import React, { useState, useEffect } from 'react';
import { FaUser, FaCalendarAlt, FaCheckCircle, FaTimes, FaEnvelope, FaClock } from 'react-icons/fa';
import api from '../../utils/api';

export default function AllCustomers() {
  const [subscriptionRequests, setSubscriptionRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSubscriptionRequests();
  }, []);

  const fetchSubscriptionRequests = async () => {
    try {
      const response = await api.get('/mess/subscriptions/owner');
      const acceptedCustomers = response.data.data.filter(sub => sub.status === 'accepted');
      setSubscriptionRequests(acceptedCustomers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('Failed to load customers');
      setLoading(false);
    }
  };

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const CustomerDetailsModal = ({ customer, onClose }) => {
    if (!customer) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FaTimes className="w-5 h-5" />
          </button>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 border-b pb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <FaUser className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {customer.student.username}
                </h3>
                <div className="flex items-center text-gray-500">
                  <FaEnvelope className="w-4 h-4 mr-2" />
                  {customer.student.email}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700">Subscription Info</h4>
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="w-4 h-4 mr-2" />
                  Start Date: {new Date(customer.subscriptionDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-gray-600">
                  <FaClock className="w-4 h-4 mr-2" />
                  Joined: {new Date(customer.student.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center text-green-600">
                  <FaCheckCircle className="w-4 h-4 mr-2" />
                  Status: Active
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-700">Mess Details</h4>
                <p className="text-gray-600">Mess Name: {customer.mess.messName}</p>
                <p className="text-gray-600">Monthly Price: ₹{customer.mess.monthlyPrice}</p>
                <p className="text-gray-600">Mess Type: {customer.mess.messType}</p>
              </div>
            </div>

            <div className="border-t pt-4 mt-4 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500 p-4 bg-red-50 rounded-lg">
      <p>{error}</p>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Active Subscribers</h2>
        <div className="bg-green-100 px-4 py-2 rounded-full">
          <span className="text-green-600 font-medium">
            Total Active: {subscriptionRequests.length}
          </span>
        </div>
      </div>

      {subscriptionRequests.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FaUser className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No active subscribers found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptionRequests.map((customer) => (
            <div 
              key={customer._id} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 rounded-full p-3">
                      <FaUser className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {customer.student.username}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {customer.student.email}
                      </p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full font-medium">
                    Active
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600 border-t pt-4">
                  <div className="flex items-center">
                    <FaCalendarAlt className="w-4 h-4 mr-2" />
                    Started: {new Date(customer.subscriptionDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-green-600">
                    <FaCheckCircle className="w-4 h-4 mr-2" />
                    Subscription Active
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <button 
                    className="w-full bg-blue-50 text-blue-600 py-2 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium"
                    onClick={() => handleViewDetails(customer)}
                  >
                    View Full Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <CustomerDetailsModal 
          customer={selectedCustomer} 
          onClose={() => {
            setShowModal(false);
            setSelectedCustomer(null);
          }}
        />
      )}
    </div>
  );
}
