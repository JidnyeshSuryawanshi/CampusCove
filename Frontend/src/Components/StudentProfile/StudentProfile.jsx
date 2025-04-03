import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaSpinner } from 'react-icons/fa';
import ProfileCompletion from './ProfileCompletion';
import PersonalInfoForm from './PersonalInfoForm';
import AcademicInfoForm from './AcademicInfoForm';
import PaymentInfoForm from './PaymentInfoForm';
import PreferencesForm from './PreferencesForm';
import DocumentsForm from './DocumentsForm';
import { toast } from 'react-toastify';
import api, { getUserDetails } from '../../utils/api';

export default function StudentProfile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [completedSections, setCompletedSections] = useState({
    personal: false,
    academic: false,
    preferences: false,
    payment: false,
    documents: false
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await getUserDetails();

      if (response.success && response.data) {
        // The new API returns both user account and profile data
        const { account, profile } = response.data;
        
        // Set profile data if it exists, otherwise set an empty object
        setProfileData(profile || {});
        console.log('User details successfully loaded:', response.data);
        
        // Only update completed sections if profile exists
        if (profile) {
          // Update completed sections based on correct data structure
          const updatedCompletedSections = {
            personal: Boolean(
              profile.personalInfo && 
              profile.personalInfo.fullName && 
              profile.personalInfo.phoneNumber
            ),
            academic: Boolean(
              profile.academicInfo && 
              profile.academicInfo.institution && 
              profile.academicInfo.studentId && 
              profile.academicInfo.course
            ),
            payment: Boolean(
              profile.paymentInfo && 
              profile.paymentInfo.preferredPaymentMethods && 
              profile.paymentInfo.preferredPaymentMethods.length > 0
            ),
            preferences: Boolean(
              profile.preferences && 
              (profile.preferences.bookingReminders !== undefined || 
               profile.preferences.emailNotifications !== undefined)
            ),
            documents: Boolean(
              profile.documents && 
              profile.documents.length > 0
            )
          };
          
          console.log('Profile completion status:', updatedCompletedSections);
          setCompletedSections(updatedCompletedSections);
          
          // Calculate and log overall completion percentage
          const completedCount = Object.values(updatedCompletedSections).filter(Boolean).length;
          const totalSections = Object.keys(updatedCompletedSections).length;
          const completionPercentage = Math.round((completedCount / totalSections) * 100);
          console.log(`Overall profile completion: ${completionPercentage}%`);
        }
      } else {
        console.error('Invalid user data format:', response);
        toast.error('Invalid user data received from server');
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      toast.error(error.response?.data?.message || 'Failed to load user details');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePersonalInfo = async (data) => {
    try {
      setSaving(true);
      const response = await api.put('/student/profile/personal', data);
      
      if (response.data.success) {
        toast.success('Personal information updated successfully');
        // Update the profile data with the new values
        setProfileData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender
          }
        }));
        setCompletedSections(prev => ({ ...prev, personal: true }));
      }
    } catch (error) {
      console.error('Error saving personal info:', error);
      toast.error(error.response?.data?.message || 'Failed to update personal information');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAcademicInfo = async (data) => {
    try {
      setSaving(true);
      const response = await api.put('/student/profile/academic', data);
      
      if (response.data.success) {
        toast.success('Academic information updated successfully');
        // Update the profile data with the new values
        setProfileData(prev => ({
          ...prev,
          academicInfo: {
            ...prev.academicInfo,
            institution: data.institution,
            studentId: data.studentId,
            course: data.course,
            year: data.year,
            graduationYear: data.graduationYear
          }
        }));
        setCompletedSections(prev => ({ ...prev, academic: true }));
      }
    } catch (error) {
      console.error('Error saving academic info:', error);
      toast.error(error.response?.data?.message || 'Failed to update academic information');
    } finally {
      setSaving(false);
    }
  };

  const handleSavePaymentInfo = async (data) => {
    try {
      setSaving(true);
      const response = await api.put('/student/profile/payment', data);
      
      if (response.data.success) {
        toast.success('Payment information updated successfully');
        
        // Create an updated payment info object
        const updatedPaymentInfo = {
          ...profileData?.paymentInfo,
          preferredPaymentMethods: profileData?.paymentInfo?.preferredPaymentMethods || ['card']
        };
        
        // If card saved, update the savedCards array
        if (data.saveCard && data.cardNumber && data.cardNumber.length >= 4) {
          const lastFourDigits = data.cardNumber.replace(/\s/g, '').slice(-4);
          const cardData = {
            cardHolderName: data.cardHolderName,
            lastFourDigits: lastFourDigits,
            expiryDate: data.expiryDate,
            network: 'other' // Simple default
          };
          
          updatedPaymentInfo.savedCards = [
            ...(profileData?.paymentInfo?.savedCards || []),
            cardData
          ];
        }
        
        // Update profile data
        setProfileData(prev => ({
          ...prev,
          paymentInfo: updatedPaymentInfo
        }));
        
        setCompletedSections(prev => ({ ...prev, payment: true }));
      }
    } catch (error) {
      console.error('Error saving payment info:', error);
      toast.error(error.response?.data?.message || 'Failed to update payment information');
    } finally {
      setSaving(false);
    }
  };

  const handleSavePreferences = async (data) => {
    try {
      setSaving(true);
      const response = await api.put('/student/profile/preferences', data);
      
      if (response.data.success) {
        toast.success('Preferences updated successfully');
        // Update profile data with new preferences
        setProfileData(prev => ({
          ...prev,
          preferences: {
            bookingReminders: data.bookingReminders,
            emailNotifications: data.emailNotifications,
            servicePreferences: {
              dietaryPreferences: data.dietaryPreferences,
              accommodationPreferences: data.accommodationPreferences,
              gymPreferences: data.gymPreferences
            }
          }
        }));
        setCompletedSections(prev => ({ ...prev, preferences: true }));
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error(error.response?.data?.message || 'Failed to update preferences');
    } finally {
      setSaving(false);
    }
  };

  // Refresh profile data after document upload/deletion
  const refreshProfileData = async () => {
    try {
      const response = await getUserDetails();
      
      if (response.success && response.data) {
        const { profile } = response.data;
        
        if (profile) {
          setProfileData(profile);
          console.log('Profile data refreshed successfully');
          
          // Update all completion statuses
          const updatedCompletedSections = {
            personal: Boolean(
              profile.personalInfo && 
              profile.personalInfo.fullName && 
              profile.personalInfo.phoneNumber
            ),
            academic: Boolean(
              profile.academicInfo && 
              profile.academicInfo.institution && 
              profile.academicInfo.studentId && 
              profile.academicInfo.course
            ),
            payment: Boolean(
              profile.paymentInfo && 
              profile.paymentInfo.preferredPaymentMethods && 
              profile.paymentInfo.preferredPaymentMethods.length > 0
            ),
            preferences: Boolean(
              profile.preferences && 
              (profile.preferences.bookingReminders !== undefined || 
               profile.preferences.emailNotifications !== undefined)
            ),
            documents: Boolean(
              profile.documents && 
              profile.documents.length > 0
            )
          };
          
          setCompletedSections(updatedCompletedSections);
          
          // Calculate and log overall completion percentage
          const completedCount = Object.values(updatedCompletedSections).filter(Boolean).length;
          const totalSections = Object.keys(updatedCompletedSections).length;
          const completionPercentage = Math.round((completedCount / totalSections) * 100);
          console.log(`Overall profile completion: ${completionPercentage}%`);
          
          return profile;
        } else {
          console.log('No profile data found during refresh');
          setProfileData({});
        }
      } else {
        console.error('Invalid user data format during refresh:', response);
      }
    } catch (error) {
      console.error('Error refreshing profile data:', error);
      // Don't show toast to avoid confusion, as this is a background refresh
    }
    
    return null;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-green-600 text-4xl" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div className="flex-shrink-0">
          {profileData?.profileImage ? (
            <img 
              src={profileData.profileImage} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-4 border-green-100"
            />
          ) : (
            <FaUserCircle className="w-24 h-24 text-gray-400" />
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {profileData?.fullName || 'Complete Your Profile'}
          </h1>
          <p className="text-gray-600">
            {profileData?.email || 'Update your information to enhance your experience'}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ProfileCompletion completedSections={completedSections} />
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-800">Profile Sections</h3>
            </div>
            <ul>
              <li>
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`w-full text-left px-4 py-3 flex items-center ${
                    activeTab === 'personal' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-3 ${
                    completedSections.personal ? 'bg-green-500' : 'bg-gray-300'
                  }`}></span>
                  Personal Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('academic')}
                  className={`w-full text-left px-4 py-3 flex items-center ${
                    activeTab === 'academic' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-3 ${
                    completedSections.academic ? 'bg-green-500' : 'bg-gray-300'
                  }`}></span>
                  Academic Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`w-full text-left px-4 py-3 flex items-center ${
                    activeTab === 'payment' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-3 ${
                    completedSections.payment ? 'bg-green-500' : 'bg-gray-300'
                  }`}></span>
                  Payment Methods
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`w-full text-left px-4 py-3 flex items-center ${
                    activeTab === 'preferences' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-3 ${
                    completedSections.preferences ? 'bg-green-500' : 'bg-gray-300'
                  }`}></span>
                  Preferences
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`w-full text-left px-4 py-3 flex items-center ${
                    activeTab === 'documents' ? 'bg-green-50 text-green-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-3 ${
                    completedSections.documents ? 'bg-green-500' : 'bg-gray-300'
                  }`}></span>
                  Documents & Verification
                </button>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="md:col-span-2">
          {activeTab === 'personal' && (
            <PersonalInfoForm 
              initialData={profileData} 
              onSave={handleSavePersonalInfo}
              loading={saving}
            />
          )}
          
          {activeTab === 'academic' && (
            <AcademicInfoForm 
              initialData={profileData} 
              onSave={handleSaveAcademicInfo}
              loading={saving}
            />
          )}
          
          {activeTab === 'payment' && (
            <PaymentInfoForm 
              initialData={profileData} 
              onSave={handleSavePaymentInfo}
              loading={saving}
            />
          )}
          
          {activeTab === 'preferences' && (
            <PreferencesForm
              initialData={profileData}
              onSave={handleSavePreferences}
              loading={saving}
            />
          )}
          
          {activeTab === 'documents' && (
            <DocumentsForm
              initialData={profileData}
              onRefresh={refreshProfileData}
            />
          )}
        </div>
      </div>
    </div>
  );
} 