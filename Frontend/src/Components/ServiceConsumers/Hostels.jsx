import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaRupeeSign, FaBed, FaWifi, FaSnowflake, FaTv, FaParking, FaShieldAlt, FaUtensils, FaBroom, FaTint, FaBoxOpen, FaTshirt } from 'react-icons/fa';
import HostelDetail from './HostelDetail';
import { fetchHostels } from '../../utils/api';

export default function Hostels() {
  const [hostels, setHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState(null);

  useEffect(() => {
    const getHostels = async () => {
      try {
        setLoading(true);
        const data = await fetchHostels();
        setHostels(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching hostels:', err);
        setError('Failed to load hostels. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getHostels();
  }, []);

  // Function to display amenities icons
  const renderAmenities = (amenities) => {
    if (!amenities) return [];
    
    const amenityIcons = [
      { key: 'wifi', icon: <FaWifi key="wifi" className="text-green-500 mr-2" title="WiFi" /> },
      { key: 'ac', icon: <FaSnowflake key="ac" className="text-green-500 mr-2" title="AC" /> },
      { key: 'tv', icon: <FaTv key="tv" className="text-green-500 mr-2" title="TV" /> },
      { key: 'fridge', icon: <FaBoxOpen key="fridge" className="text-green-500 mr-2" title="Fridge" /> },
      { key: 'washingMachine', icon: <FaTshirt key="washing" className="text-green-500 mr-2" title="Washing Machine" /> },
      { key: 'hotWater', icon: <FaTint key="hotwater" className="text-green-500 mr-2" title="Hot Water" /> },
      { key: 'parking', icon: <FaParking key="parking" className="text-green-500 mr-2" title="Parking" /> },
      { key: 'security', icon: <FaShieldAlt key="security" className="text-green-500 mr-2" title="Security" /> },
      { key: 'meals', icon: <FaUtensils key="meals" className="text-green-500 mr-2" title="Meals" /> },
      { key: 'cleaning', icon: <FaBroom key="cleaning" className="text-green-500 mr-2" title="Cleaning" /> }
    ];
    
    return amenityIcons
      .filter(item => amenities[item.key])
      .map(item => item.icon);
  };

  // Map room type to a more user-friendly display
  const getRoomTypeLabel = (type) => {
    const types = {
      single: 'Single Room',
      double: 'Double Room',
      triple: 'Triple Room',
      dormitory: 'Dormitory',
      flat: 'Flat/Apartment'
    };
    return types[type] || type;
  };

  // Handle opening the details modal
  const handleViewDetails = (hostel) => {
    setSelectedHostel(hostel);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Handle closing the details modal
  const handleCloseDetails = () => {
    setSelectedHostel(null);
    // Re-enable body scrolling
    document.body.style.overflow = 'auto';
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
        <h2 className="text-2xl font-semibold text-gray-900">Available Hostels</h2>
        <div className="flex space-x-2">
          <select className="border rounded-md px-3 py-1 text-sm" defaultValue="">
            <option value="" disabled>Filter by Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
          <select className="border rounded-md px-3 py-1 text-sm" defaultValue="">
            <option value="" disabled>Room Type</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="triple">Triple</option>
            <option value="dormitory">Dormitory</option>
            <option value="flat">Flat</option>
          </select>
          <select className="border rounded-md px-3 py-1 text-sm" defaultValue="">
            <option value="" disabled>Gender</option>
            <option value="male">Male Only</option>
            <option value="female">Female Only</option>
            <option value="any">Any</option>
          </select>
        </div>
      </div>

      {hostels.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded">
          No hostels available at the moment.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostels.map((hostel) => (
            <div key={hostel._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white">
              <div className="relative h-48 bg-gray-200">
                {hostel.images && hostel.images.length > 0 ? (
                  <img 
                    src={hostel.images[0].url} 
                    alt={hostel.roomName} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-200">
                    <FaBed className="text-5xl text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
                  {getRoomTypeLabel(hostel.roomType)}
                </div>
                {hostel.gender && hostel.gender !== 'any' && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs rounded">
                    {hostel.gender === 'male' ? 'Male Only' : 'Female Only'}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{hostel.roomName}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <FaMapMarkerAlt className="mr-1 text-green-500" />
                  <span>{hostel.address || 'Location not specified'}</span>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {hostel.description || 'No description available'}
                </p>
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center text-green-600 font-semibold">
                    <FaRupeeSign className="mr-1" />
                    <span>{hostel.price}</span>
                    <span className="text-gray-500 font-normal text-xs ml-1">/month</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <FaBed className="mr-1" />
                    <span>Capacity: {hostel.capacity}</span>
                  </div>
                </div>
                
                {/* Amenities section */}
                {hostel.amenities && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Amenities</h4>
                    <div className="flex items-center mb-2 flex-wrap">
                      {renderAmenities(hostel.amenities)}
                    </div>
                    <div className="flex flex-wrap gap-1 text-xs">
                      {Object.entries(hostel.amenities)
                        .filter(([_, value]) => value === true)
                        .map(([key]) => (
                          <span key={key} className="bg-green-50 text-green-700 px-2 py-1 rounded capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </span>
                        ))
                      }
                    </div>
                  </div>
                )}
                
                {/* Rules summary if available */}
                {hostel.rules && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Rules</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{hostel.rules}</p>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <button 
                    onClick={() => handleViewDetails(hostel)}
                    className="bg-white text-green-600 border border-green-600 px-3 py-1 rounded hover:bg-green-50 transition">
                    View Details
                  </button>
                  <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Render the hostel detail modal when a hostel is selected */}
      {selectedHostel && (
        <HostelDetail 
          hostel={selectedHostel} 
          onClose={handleCloseDetails} 
        />
      )}
    </div>
  );
}
