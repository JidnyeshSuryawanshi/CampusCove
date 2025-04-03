import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaClock, FaUserTag } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { fetchUserProfile } from '../utils/api';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Determine if user is an owner for theming
  const isOwner = user?.userType.includes('Owner');
  const themeColor = isOwner ? 'blue' : 'green';

  useEffect(() => {
    const getProfile = async () => {
      try {
        setLoading(true);
        const profileData = await fetchUserProfile();
        setProfile(profileData);
      } catch (error) {
        console.error('Profile fetch error:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className={`animate-spin rounded-full h-12 w-12 border-b-2 border-${themeColor}-500`}></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className={`text-2xl font-bold mb-6 text-${themeColor}-800`}>Profile Information</h2>
      
      <div className="space-y-6">
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <FaUser className={`text-2xl text-${themeColor}-600`} />
          <div>
            <p className="text-sm text-gray-500">Username</p>
            <p className="font-medium">{profile?.username}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <FaEnvelope className={`text-2xl text-${themeColor}-600`} />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{profile?.email}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <FaUserTag className={`text-2xl text-${themeColor}-600`} />
          <div>
            <p className="text-sm text-gray-500">Account Type</p>
            <p className="font-medium capitalize">{profile?.userType}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <FaClock className={`text-2xl text-${themeColor}-600`} />
          <div>
            <p className="text-sm text-gray-500">Member Since</p>
            <p className="font-medium">
              {new Date(profile?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 