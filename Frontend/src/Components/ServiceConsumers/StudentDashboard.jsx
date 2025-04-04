import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUtensils, FaDumbbell, FaUserCircle, FaArrowRight, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../utils/api';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [showProfileBanner, setShowProfileBanner] = useState(true);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/student/profile');

      if (response.data.success) {
        setProfileData(response.data.data);
        
        // Calculate completion percentage based on profile data
        const sections = ['fullName', 'phoneNumber', 'institution', 'studentId'];
        const completedSections = sections.filter(field => Boolean(response.data.data[field]));
        const percentage = Math.round((completedSections.length / sections.length) * 100);
        
        setCompletionPercentage(percentage);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  // Check if profile is complete
  const isProfileComplete = completionPercentage === 100;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center h-16 mb-6">
            <FaSpinner className="animate-spin text-green-600 text-2xl" />
          </div>
        )}
        
        {/* Profile Completion Banner */}
        {!loading && showProfileBanner && completionPercentage < 100 && (
          <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6 rounded-md shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex">
                <FaUserCircle className="text-green-600 text-xl mt-0.5 mr-3" />
                <div>
                  <h3 className="text-green-800 font-medium">Complete Your Profile</h3>
                  <p className="text-green-700 text-sm mt-1">
                    Enhance your booking experience by completing your profile information.
                    Current completion: {completionPercentage}%
                  </p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate('/student-profile')}
                    className="mt-3 bg-green-600 text-white px-4 py-1.5 text-sm rounded hover:bg-green-700 inline-flex items-center"
                  >
                    Complete Profile <FaArrowRight className="ml-1" />
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setShowProfileBanner(false)}
                className="text-green-800 hover:text-green-900"
              >
                &times;
              </button>
            </div>
          </div>
        )}

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