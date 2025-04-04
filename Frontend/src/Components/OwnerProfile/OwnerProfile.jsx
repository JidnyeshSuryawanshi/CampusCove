import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle, FaSpinner, FaCamera, FaInfoCircle } from 'react-icons/fa';
import ProfileCompletion from './ProfileCompletion';
import PersonalInfoForm from './PersonalInfoForm';
import BusinessInfoForm from './BusinessInfoForm';
import PaymentSettingsForm from './PaymentSettingsForm';
import PreferencesForm from './PreferencesForm';
import DocumentsForm from './DocumentsForm';
import { toast } from 'react-toastify';
import { useOwnerProfile } from '../../context/OwnerProfileContext';

export default function OwnerProfile() {
  const {
    profile: profileData,
    loading,
    completionSteps,
    completionPercentage,
    updatePersonalInfo,
    updateBusinessInfo,
    updatePaymentSettings,
    updatePreferences,
    updateProfilePicture,
    getCompletionSteps
  } = useOwnerProfile();

  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [completedSections, setCompletedSections] = useState({
    personal: false,
    business: false,
    payment: false,
    preferences: false,
    documents: false
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    // If we have completion steps from the backend, use those
    if (completionSteps) {
      setCompletedSections(completionSteps);
    }
    // Fallback to local calculation if backend data is not available
    else if (profileData) {
      // Update completed sections based on profile data
      const updatedCompletedSections = {
        personal: Boolean(
          profileData.personalInfo &&
          profileData.personalInfo.fullName &&
          profileData.personalInfo.phoneNumber
        ),
        business: Boolean(
          profileData.businessInfo &&
          profileData.businessInfo.businessName &&
          profileData.businessInfo.businessType
        ),
        payment: Boolean(
          profileData.paymentSettings &&
          profileData.paymentSettings.accountNumber
        ),
        preferences: Boolean(
          profileData.preferences &&
          (profileData.preferences.bookingPreferences !== undefined ||
           profileData.preferences.notificationSettings !== undefined)
        ),
        documents: Boolean(
          profileData.documents &&
          profileData.documents.length > 0
        )
      };

      setCompletedSections(updatedCompletedSections);
    }
  }, [profileData, completionSteps]);

  const handleSavePersonalInfo = async (data) => {
    try {
      setSaving(true);
      setActiveTab('personal'); // Ensure we're on the right tab
      await updatePersonalInfo(data);
      // Refresh completion steps to update UI
      await getCompletionSteps();
      toast.success('Personal information updated successfully');
    } catch (error) {
      console.error('Error saving personal info:', error);
      toast.error(error.response?.data?.message || 'Failed to update personal information');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveBusinessInfo = async (data) => {
    try {
      setSaving(true);
      setActiveTab('business'); // Ensure we're on the right tab
      await updateBusinessInfo(data);
      // Refresh completion steps to update UI
      await getCompletionSteps();
      toast.success('Business information updated successfully');
    } catch (error) {
      console.error('Error saving business info:', error);
      toast.error(error.response?.data?.message || 'Failed to update business information');
    } finally {
      setSaving(false);
    }
  };

  const handleSavePaymentSettings = async (data) => {
    try {
      setSaving(true);
      setActiveTab('payment'); // Ensure we're on the right tab
      await updatePaymentSettings(data);
      // Refresh completion steps to update UI
      await getCompletionSteps();
      toast.success('Payment settings updated successfully');
    } catch (error) {
      console.error('Error saving payment settings:', error);
      toast.error(error.response?.data?.message || 'Failed to update payment settings');
    } finally {
      setSaving(false);
    }
  };

  const handleSavePreferences = async (data) => {
    try {
      setSaving(true);
      setActiveTab('preferences'); // Ensure we're on the right tab
      await updatePreferences(data);
      // Refresh completion steps to update UI
      await getCompletionSteps();
      toast.success('Preferences updated successfully');
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error(error.response?.data?.message || 'Failed to update preferences');
    } finally {
      setSaving(false);
    }
  };

  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleProfilePictureChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.match('image.*')) {
        toast.error('Please select an image file');
        return;
      }

      try {
        setUploadingPhoto(true);

        const formData = new FormData();
        formData.append('profileImage', file);

        await updateProfilePicture(formData);
        toast.success('Profile picture updated successfully');
      } catch (error) {
        console.error('Error updating profile picture:', error);
        toast.error(error.response?.data?.message || 'Failed to update profile picture');
      } finally {
        setUploadingPhoto(false);
      }
    }
  };

  if (loading && !profileData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <FaSpinner className="animate-spin text-blue-600 text-4xl mx-auto mb-4" />
            <p className="text-gray-600">Loading your profile data...</p>
          </div>
        </div>
      </div>
    );
  }

  // Debug function to show profile data status
  const renderDebugInfo = () => {
    if (!profileData) return null;

    return (
      <div className="mb-4 p-3 bg-gray-100 rounded-md text-xs">
        <div className="flex items-start">
          <FaInfoCircle className="text-blue-500 mt-0.5 mr-2" />
          <div>
            <p className="font-semibold">Profile Data Status:</p>
            <p>Personal Info: {profileData.personalInfo ? 'Loaded' : 'Not loaded'}</p>
            <p>Business Info: {profileData.businessInfo ? 'Loaded' : 'Not loaded'}</p>
            <p>Completion: {completionPercentage}%</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Uncomment for debugging */}
      {/* {renderDebugInfo()} */}

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
        <div className="flex-shrink-0 relative">
          <div
            className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 cursor-pointer relative"
            onClick={handleProfilePictureClick}
          >
            {profileData?.profileImage ? (
              <img
                src={profileData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-full h-full text-gray-400" />
            )}

            {/* Overlay for hover effect */}
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <FaCamera className="text-white text-xl" />
            </div>

            {/* Loading spinner */}
            {uploadingPhoto && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <FaSpinner className="text-white text-xl animate-spin" />
              </div>
            )}
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {profileData?.personalInfo?.fullName || 'Complete Your Business Profile'}
          </h1>
          <p className="text-gray-600">
            {profileData?.businessInfo?.businessName || 'Update your information to enhance your service listing'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <ProfileCompletion
            completedSections={completedSections}
            completionPercentage={completionPercentage}
          />

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-medium text-gray-800">Profile Sections</h3>
            </div>
            <ul>
              <li>
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`w-full text-left px-4 py-3 flex items-center ${
                    activeTab === 'personal' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-3 ${
                    completedSections.personal ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></span>
                  Personal Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('business')}
                  className={`w-full text-left px-4 py-3 flex items-center ${
                    activeTab === 'business' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-3 ${
                    completedSections.business ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></span>
                  Business Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`w-full text-left px-4 py-3 flex items-center ${
                    activeTab === 'payment' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-3 ${
                    completedSections.payment ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></span>
                  Payment Settings
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`w-full text-left px-4 py-3 flex items-center ${
                    activeTab === 'preferences' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-3 ${
                    completedSections.preferences ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></span>
                  Preferences
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`w-full text-left px-4 py-3 flex items-center ${
                    activeTab === 'documents' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full mr-3 ${
                    completedSections.documents ? 'bg-blue-500' : 'bg-gray-300'
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

          {activeTab === 'business' && (
            <BusinessInfoForm
              initialData={profileData}
              onSave={handleSaveBusinessInfo}
              loading={saving}
            />
          )}

          {activeTab === 'payment' && (
            <PaymentSettingsForm
              initialData={profileData}
              onSave={handleSavePaymentSettings}
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
              onRefresh={() => {}} // The context will handle refreshing the profile
            />
          )}
        </div>
      </div>
    </div>
  );
}
