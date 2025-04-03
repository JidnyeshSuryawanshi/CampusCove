import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaRupeeSign, FaUtensils, FaLeaf, FaDrumstickBite, FaClock } from 'react-icons/fa';

export default function MessServices() {
  const [messServices, setMessServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mess', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch mess services');
        }

        const data = await response.json();
        setMessServices(data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching mess services:', err);
        setError('Failed to load mess services. Please try again later.');
        setLoading(false);
      }
    };

    fetchMessServices();
  }, []);

  // Function to get meal type icon
  const getMealTypeIcon = (mealType) => {
    switch(mealType) {
      case 'veg':
        return <FaLeaf className="text-green-500 mr-1" title="Vegetarian" />;
      case 'non-veg':
        return <FaDrumstickBite className="text-red-500 mr-1" title="Non-Vegetarian" />;
      case 'both':
        return (
          <>
            <FaLeaf className="text-green-500 mr-1" title="Vegetarian" />
            <FaDrumstickBite className="text-red-500 mr-1" title="Non-Vegetarian" />
          </>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Mess Services</h2>
        <div className="flex space-x-2">
          <select className="border rounded-md px-3 py-1 text-sm" defaultValue="">
            <option value="" disabled>Filter by Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
          <select className="border rounded-md px-3 py-1 text-sm" defaultValue="">
            <option value="" disabled>Meal Type</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>

      {messServices.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded">
          No mess services available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messServices.map((mess) => (
            <div key={mess._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="relative h-48 bg-gray-200">
                {mess.images && mess.images.length > 0 ? (
                  <img 
                    src={mess.images[0].url} 
                    alt={mess.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs rounded flex items-center">
                  {getMealTypeIcon(mess.mealType)}
                  <span className="ml-1">{mess.mealType === 'veg' ? 'Veg' : mess.mealType === 'non-veg' ? 'Non-Veg' : 'Mixed'}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{mess.name}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FaMapMarkerAlt className="mr-1 text-green-500" />
                  <span>{mess.location || 'Location not specified'}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {mess.description || 'No description available'}
                </p>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center text-green-600 font-semibold">
                    <FaRupeeSign className="mr-1" />
                    <span>{mess.monthlySubscription}</span>
                    <span className="text-gray-500 font-normal text-xs ml-1">/month</span>
                  </div>
                  {mess.timings && (
                    <div className="flex items-center text-sm text-gray-500">
                      <FaClock className="mr-1" />
                      <span>{mess.timings}</span>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Meal Schedule</h4>
                  <div className="flex flex-wrap gap-1 text-xs">
                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded">Breakfast</span>
                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded">Lunch</span>
                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded">Dinner</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button className="bg-white text-green-600 border border-green-600 px-3 py-1 rounded hover:bg-green-50">
                    View Menu
                  </button>
                  <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
