import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaSpinner } from 'react-icons/fa';
import OwnerProfileCompletion from './OwnerProfileCompletion';
import PersonalInfoForm from './OwnerForms/PersonalInfoForm';
import BusinessInfoForm from './OwnerForms/BusinessInfoForm';
import PropertyDetailsForm from './OwnerForms/PropertyDetailsForm';
import PaymentSettingsForm from './OwnerForms/PaymentSettingsForm';
import DocumentsForm from './OwnerForms/DocumentsForm';
import { toast } from 'react-toastify';
import { 
  getOwnerProfile, 
  getOwnerProfileStatus,
  createOwnerProfile,
  updateOwnerPersonalInfo, 
  updateOwnerBusinessInfo,
  updateOwnerServices,
  updateOwnerPaymentInfo 
} from '../../utils/api';

const OwnerProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [completedSections, setCompletedSections] = useState({
    personal: false,
    business: false,
    property: false,
    payment: false,
    documents: false
  });

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      // Get owner profile data
      let response;
      
      try {
        response = await getOwnerProfile();
        console.log('Owner profile retrieved:', response);
      } catch (error) {
        // If profile not found (404), create a new one
        if (error.response && error.response.status === 404) {
          console.log('Profile not found, creating a new one...');
          // Create a new empty profile
          try {
            const createResponse = await createOwnerProfile({});
            if (createResponse.success) {
              response = createResponse;
              toast.success('New owner profile created');
            }
          } catch (createError) {
            console.error('Error creating profile:', createError);
            toast.error(createError.response?.data?.error || 'Failed to create profile');
            setLoading(false);
            return;
          }
        } else {
          throw error;
        }
      }

      if (response && response.success && response.data) {
        setProfileData(response.data);
        console.log('Owner profile data loaded:', response.data);
        
        try {
          // Get profile completion status
          const statusResponse = await getOwnerProfileStatus();
          if (statusResponse.success && statusResponse.data) {
            setCompletedSections({
              personal: statusResponse.data.personal || false,
              business: statusResponse.data.business || false,
              property: statusResponse.data.property || false,
              payment: statusResponse.data.payment || false,
              documents: statusResponse.data.documents || false
            });
          }
        } catch (statusError) {
          console.error('Error fetching profile status:', statusError);
          // Continue even if status fetch fails
        }
      }
    } catch (error) {
      console.error('Error fetching owner profile data:', error);
      toast.error(error.response?.data?.error || 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePersonalInfo = async (data) => {
    try {
      setSaving(true);
      const response = await updateOwnerPersonalInfo(data);
      if (response.success) {
        toast.success('Personal information updated successfully');
        // Update the local profile data
        setProfileData(prevData => ({
          ...prevData,
          personalInfo: {
            ...prevData.personalInfo,
            ...data
          }
        }));
        
        // Update completion status
        setCompletedSections(prev => ({
          ...prev,
          personal: true
        }));
      } else {
        toast.error(response.error || 'Failed to update personal information');
      }
    } catch (error) {
      console.error('Error saving personal info:', error);
      toast.error(error.response?.data?.error || 'Failed to update personal information');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveBusinessInfo = async (data) => {
    try {
      setSaving(true);
      const response = await updateOwnerBusinessInfo(data);
      if (response.success) {
        toast.success('Business information updated successfully');
        // Update the local profile data
        setProfileData(prevData => ({
          ...prevData,
          businessInfo: {
            ...prevData.businessInfo,
            businessName: data.businessName,
            businessType: data.businessType,
            registrationNumber: data.registrationNumber,
            gstNumber: data.gstNumber,
            yearEstablished: data.yearEstablished,
            description: data.description
          },
          contactInfo: {
            ...prevData.contactInfo,
            ...data.contactInfo
          }
        }));
        
        // Update completion status
        setCompletedSections(prev => ({
          ...prev,
          business: true
        }));
      } else {
        toast.error(response.error || 'Failed to update business information');
      }
    } catch (error) {
      console.error('Error saving business info:', error);
      toast.error(error.response?.data?.error || 'Failed to update business information');
    } finally {
      setSaving(false);
    }
  };

  const handleSavePropertyDetails = async (data) => {
    try {
      setSaving(true);
      
      // Extract business type from profile data
      const serviceType = profileData?.businessInfo?.businessType || 'hostel';
      
      // Format the data according to the service type
      let formattedData = {};
      
      if (serviceType === 'hostel') {
        formattedData = {
          isActive: true,
          totalRooms: data.totalProperties || 0,
          amenities: data.amenities ? Object.keys(data.amenities).filter(key => data.amenities[key]) : []
        };
      } else if (serviceType === 'mess') {
        formattedData = {
          isActive: true,
          cuisineTypes: data.cuisineTypes || [],
          specialDiets: data.specialDiets || []
        };
      } else if (serviceType === 'gym') {
        formattedData = {
          isActive: true,
          equipmentTypes: data.equipmentTypes || [],
          specialFacilities: data.specialFacilities || []
        };
      }
      
      console.log('Sending service data:', { serviceType, serviceData: formattedData });
      
      // Call the updated API function with serviceType and formatted serviceData
      const response = await updateOwnerServices(serviceType, formattedData);
      
      if (response.success) {
        setProfileData(prevData => ({
          ...prevData,
          services: response.data.services
        }));
        setCompletedSections(prev => ({ ...prev, property: true }));
        toast.success('Property details saved successfully');
      } else {
        toast.error(response.error || 'Failed to save property details');
      }
    } catch (error) {
      console.error('Error saving property details:', error);
      toast.error('An unexpected error occurred while saving property details');
    } finally {
      setSaving(false);
    }
  };

  const handleSavePaymentSettings = async (data) => {
    try {
      setSaving(true);
      const response = await updateOwnerPaymentInfo(data);
      if (response.success) {
        setProfileData(prevData => ({
          ...prevData,
          paymentInfo: response.data.paymentInfo || data
        }));
        setCompletedSections(prev => ({ ...prev, payment: true }));
        toast.success('Payment settings saved successfully');
      } else {
        toast.error(response.error || 'Failed to save payment settings');
      }
    } catch (error) {
      console.error('Error saving payment settings:', error);
      toast.error(error.response?.data?.error || 'Failed to save payment settings');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDocuments = async (data) => {
    try {
      setSaving(true);
      // Update the local profile data
      setProfileData(prevData => ({
        ...prevData,
        documents: data
      }));
      setCompletedSections(prev => ({ ...prev, documents: true }));
      toast.success('Documents saved successfully');
    } catch (error) {
      console.error('Error saving documents:', error);
      toast.error(error.response?.data?.error || 'Failed to save documents');
    } finally {
      setSaving(false);
    }
  };

  const handleDocumentsUpdated = () => {
    setCompletedSections(prev => ({ ...prev, documents: true }));
  };

  const renderFormContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-primary text-4xl" />
        </div>
      );
    }

    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoForm
            initialData={profileData?.personalInfo || {}}
            onSubmit={handleSavePersonalInfo}
            loading={saving}
          />
        );
      case 'business':
        return (
          <BusinessInfoForm
            initialData={profileData?.businessInfo || {}}
            onSubmit={handleSaveBusinessInfo}
            loading={saving}
          />
        );
      case 'property':
        return (
          <PropertyDetailsForm
            initialData={profileData?.services || {}}
            businessType={profileData?.businessInfo?.businessType}
            onSubmit={handleSavePropertyDetails}
            loading={saving}
            propertyDetails={profileData?.services || {}}
          />
        );
      case 'payment':
        return (
          <PaymentSettingsForm
            initialData={profileData?.paymentInfo || {}}
            onSubmit={handleSavePaymentSettings}
            loading={saving}
          />
        );
      case 'documents':
        return (
          <DocumentsForm
            ownerId={profileData?.user}
            documents={profileData?.documents || []}
            onDocumentsUpdated={handleDocumentsUpdated}
            onSubmit={handleSaveDocuments}
            loading={saving}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {profileData?.personalInfo?.profilePicture?.url ? (
                <img 
                  src={profileData.personalInfo.profilePicture.url} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle className="text-4xl text-gray-400" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {profileData?.personalInfo?.fullName || 'Complete Your Profile'}
              </h1>
              <p className="text-gray-600">
                {profileData?.businessInfo?.businessName || 'Add your business details'}
              </p>
            </div>
          </div>

          <OwnerProfileCompletion 
            completedSections={completedSections}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div className="mt-6">
            {renderFormContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;