import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSpinner, FaCamera, FaInfoCircle, FaIdCard, FaBuilding, FaCog, FaFileAlt } from 'react-icons/fa';
import ProfileCompletion from './ProfileCompletion';
import { toast } from 'react-toastify';
import { useOwnerProfile } from '../../context/OwnerProfileContext';
import PersonalInfoForm from './PersonalInfoForm';
import BusinessInfoForm from './BusinessInfoForm';
import PreferencesForm from './PreferencesForm';
import DocumentsForm from './DocumentsForm';

export default function OwnerProfile() {
  const navigate = useNavigate();
  const {
    profile: profileData,
    loading,
    completionSteps,
    completionPercentage,
    updatePersonalInfo,
    updateBusinessInfo,
    updatePreferences,
    updateProfilePicture,
    getCompletionSteps
  } = useOwnerProfile();

  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [completedSections, setCompletedSections] = useState({
    personal: false,
    business: false,
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
      await updatePersonalInfo(data);
      // Refresh completion steps to update UI
      await getCompletionSteps();
      toast.success('Personal information updated successfully');
      setActiveSection(null);
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
      await updateBusinessInfo(data);
      // Refresh completion steps to update UI
      await getCompletionSteps();
      toast.success('Business information updated successfully');
      setActiveSection(null);
    } catch (error) {
      console.error('Error saving business info:', error);
      toast.error(error.response?.data?.message || 'Failed to update business information');
    } finally {
      setSaving(false);
    }
  };

  const handleSavePreferences = async (data) => {
    try {
      setSaving(true);
      await updatePreferences(data);
      // Refresh completion steps to update UI
      await getCompletionSteps();
      toast.success('Preferences updated successfully');
      setActiveSection(null);
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

  // Render form based on active section
  const renderActiveForm = () => {
    if (!activeSection) return null;

    switch (activeSection) {
      case 'personal':
        return (
          <PersonalInfoForm
            initialData={profileData?.personalInfo || {}}
            onSave={handleSavePersonalInfo}
            onCancel={() => setActiveSection(null)}
            isSaving={saving}
          />
        );
      case 'business':
        return (
          <BusinessInfoForm
            initialData={profileData?.businessInfo || {}}
            onSave={handleSaveBusinessInfo}
            onCancel={() => setActiveSection(null)}
            isSaving={saving}
          />
        );
      case 'preferences':
        return (
          <PreferencesForm
            initialData={profileData?.preferences || {}}
            onSave={handleSavePreferences}
            onCancel={() => setActiveSection(null)}
            isSaving={saving}
          />
        );
      case 'documents':
        return (
          <DocumentsForm
            documents={profileData?.documents || []}
            onClose={() => setActiveSection(null)}
          />
        );
      default:
        return null;
    }
  };

  if (loading && !profileData) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-blue-600 text-4xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Profile header with completion percentage */}
        <div className="bg-white shadow rounded-lg mb-6 overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Profile Picture */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 cursor-pointer"
                  onClick={handleProfilePictureClick}
                >
                  {profileData?.profileImage ? (
                    <img
                      src={profileData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <FaUserCircle className="text-gray-400 w-full h-full" />
                    </div>
                  )}

                  {/* Overlay for hover effect */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full">
                    <FaCamera className="text-white text-xl" />
                  </div>

                  {/* Loading spinner */}
                  {uploadingPhoto && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">
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

              {/* Profile info and completion status */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {profileData?.personalInfo?.fullName || "Your Profile"}
                </h2>
                <p className="text-gray-500">
                  {profileData?.businessInfo?.businessName || "Manage your business information"}
                </p>
                
                {/* Profile completion progress */}
                <div className="mt-4">
                  <ProfileCompletion 
                    percentage={completionPercentage} 
                    completedSections={completedSections}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* If an active form is being shown */}
        {activeSection && (
          <div className="bg-white shadow rounded-lg mb-6 overflow-hidden">
            <div className="p-6">
              {renderActiveForm()}
            </div>
          </div>
        )}

        {/* Profile sections as cards */}
        {!activeSection && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Profile</h2>
              <p className="text-sm text-gray-500">Manage your personal and business information</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Personal Info Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <FaIdCard className="text-3xl text-blue-500" />
                    <h3 className="ml-3 text-lg font-medium text-gray-900">Personal Information</h3>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Your personal contact details</p>
                    <div className="mt-1">
                      {completedSections.personal ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Incomplete
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => setActiveSection('personal')}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                    >
                      {completedSections.personal ? 'Update Information' : 'Complete Section'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Business Info Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <FaBuilding className="text-3xl text-blue-500" />
                    <h3 className="ml-3 text-lg font-medium text-gray-900">Business Information</h3>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Details about your business</p>
                    <div className="mt-1">
                      {completedSections.business ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Incomplete
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => setActiveSection('business')}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                    >
                      {completedSections.business ? 'Update Information' : 'Complete Section'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Preferences Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <FaCog className="text-3xl text-blue-500" />
                    <h3 className="ml-3 text-lg font-medium text-gray-900">Preferences</h3>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Notification and booking preferences</p>
                    <div className="mt-1">
                      {completedSections.preferences ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Incomplete
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => setActiveSection('preferences')}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                    >
                      {completedSections.preferences ? 'Update Preferences' : 'Set Preferences'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Documents Card */}
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <FaFileAlt className="text-3xl text-blue-500" />
                    <h3 className="ml-3 text-lg font-medium text-gray-900">Documents</h3>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Upload business documents and verification</p>
                    <div className="mt-1">
                      {completedSections.documents ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Incomplete
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => setActiveSection('documents')}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                    >
                      {completedSections.documents ? 'Manage Documents' : 'Upload Documents'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
