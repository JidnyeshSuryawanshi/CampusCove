import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUtensils, FaDumbbell, FaUserCircle, FaArrowRight, FaSpinner, FaFilter } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api, { fetchHostels } from '../../utils/api';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [completionSteps, setCompletionSteps] = useState({});
  const [showProfileBanner, setShowProfileBanner] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  
  // Hostel data states
  const [hostels, setHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [hostelLoading, setHostelLoading] = useState(false);

  useEffect(() => {
    fetchProfileData();
    fetchHostelData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/student/profile');

      if (response.data.success) {
        setProfileData(response.data.data);
        
        // Fetch the profile completion status from the backend
        const completionResponse = await api.get('/student/profile/completion-steps');
        
        if (completionResponse.data.success) {
          setCompletionPercentage(completionResponse.data.completionPercentage);
          setCompletionSteps(completionResponse.data.completionSteps);
          
          // Set profile as complete if percentage is 100% or if backend says it's complete
          const isComplete = 
            completionResponse.data.completionPercentage === 100 || 
            completionResponse.data.isComplete;
            
          setIsProfileComplete(isComplete);
          
          // Log completion status for debugging
          console.log('Profile completion status:', {
            percentage: completionResponse.data.completionPercentage,
            isComplete: isComplete,
            steps: completionResponse.data.completionSteps
          });
        }
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch hostel data from API
  const fetchHostelData = async () => {
    try {
      setHostelLoading(true);
      const data = await fetchHostels();
      setHostels(data || []);
      setFilteredHostels(data || []); // Directly set filtered hostels to all hostels
    } catch (error) {
      console.error('Error fetching hostels:', error);
      toast.error('Failed to load hostel data');
    } finally {
      setHostelLoading(false);
    }
  };
  


  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-16 mb-6">
            <FaSpinner className="animate-spin text-green-600 text-2xl" />
          </div>
        )}
        
        {/* Hostel Section */}
        <div className="mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Available Hostels</h2>
          </div>
          
          {/* Hostel loading state */}
          {hostelLoading && (
            <div className="flex justify-center items-center h-16 mb-6">
              <FaSpinner className="animate-spin text-green-600 text-2xl" />
              <span className="ml-2 text-green-600">Loading hostels...</span>
            </div>
          )}
          
          {/* No results message */}
          {!hostelLoading && filteredHostels.length === 0 && (
            <div className="bg-white p-4 rounded-lg shadow text-center mb-6">
              <p className="text-gray-500">No hostels found matching your filters.</p>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Filtered Hostel Cards */}
          {filteredHostels.map((hostel) => (
            <div key={hostel._id} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaHome className="text-3xl text-green-500" />
                    <h3 className="ml-3 text-lg font-medium text-gray-900">{hostel.name || 'Hostel Room'}</h3>
                  </div>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    {hostel.roomType || 'Room'}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-gray-500">{hostel.location || 'Location not specified'}</p>
                    <p className="text-sm font-semibold text-green-600">₹{hostel.price || 0}/month</p>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    {hostel.gender === 'male' ? 'Male Only' : 
                     hostel.gender === 'female' ? 'Female Only' : 'Any Gender'}
                  </p>
                  <button 
                    onClick={() => navigate(`/dashboard/hostels/${hostel._id}`)}
                    className="w-full mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Service Cards - Only show if no filtered hostels or at least one row of hostels */}
          {(filteredHostels.length === 0 || filteredHostels.length >= 3) && (
            <>
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
            </>
          )}
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