import React, { useState, useEffect } from 'react';
import { FaBuilding, FaMapMarkerAlt, FaFileAlt, FaCalendarAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const BusinessInfoForm = ({ initialData, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    registrationNumber: '',
    gstNumber: '',
    yearEstablished: '',
    description: '',
    contactInfo: {
      businessAddress: {
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India'
      },
      businessEmail: '',
      businessPhone: '',
      website: '',
      socialMedia: {
        facebook: '',
        instagram: '',
        twitter: '',
        linkedin: ''
      }
    }
  });
  
  const [errors, setErrors] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (initialData) {
      console.log('Initial data received:', initialData);
      
      // Create a new form data object
      const newFormData = {
        // Business info fields
        businessName: initialData.businessInfo?.businessName || '',
        businessType: initialData.businessInfo?.businessType || '',
        registrationNumber: initialData.businessInfo?.registrationNumber || '',
        gstNumber: initialData.businessInfo?.gstNumber || '',
        yearEstablished: initialData.businessInfo?.yearEstablished || '',
        description: initialData.businessInfo?.description || '',
        
        // Contact info with nested structure
        contactInfo: {
          businessAddress: {
            street: initialData.contactInfo?.businessAddress?.street || '',
            city: initialData.contactInfo?.businessAddress?.city || '',
            state: initialData.contactInfo?.businessAddress?.state || '',
            pincode: initialData.contactInfo?.businessAddress?.pincode || '',
            country: initialData.contactInfo?.businessAddress?.country || 'India'
          },
          businessEmail: initialData.contactInfo?.businessEmail || '',
          businessPhone: initialData.contactInfo?.businessPhone || '',
          website: initialData.contactInfo?.website || '',
          socialMedia: {
            facebook: initialData.contactInfo?.socialMedia?.facebook || '',
            instagram: initialData.contactInfo?.socialMedia?.instagram || '',
            twitter: initialData.contactInfo?.socialMedia?.twitter || '',
            linkedin: initialData.contactInfo?.socialMedia?.linkedin || ''
          }
        }
      };
      
      console.log('Setting form data with business address:', newFormData.contactInfo.businessAddress);
      setFormData(newFormData);
      setDataLoaded(true);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested fields for contactInfo
    if (name.startsWith('contactInfo.businessAddress.')) {
      const addressField = name.split('.')[2];
      setFormData(prevState => ({
        ...prevState,
        contactInfo: {
          ...prevState.contactInfo,
          businessAddress: {
            ...prevState.contactInfo.businessAddress,
            [addressField]: value
          }
        }
      }));
    } 
    // Handle nested fields for social media
    else if (name.startsWith('contactInfo.socialMedia.')) {
      const socialField = name.split('.')[2];
      setFormData(prevState => ({
        ...prevState,
        contactInfo: {
          ...prevState.contactInfo,
          socialMedia: {
            ...prevState.contactInfo.socialMedia,
            [socialField]: value
          }
        }
      }));
    }
    // Handle other contactInfo fields
    else if (name.startsWith('contactInfo.')) {
      const contactField = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        contactInfo: {
          ...prevState.contactInfo,
          [contactField]: value
        }
      }));
    }
    // Handle regular fields
    else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
    
    // Clear error for the field being changed
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!formData.businessType) {
      newErrors.businessType = 'Business type is required';
    }
    
    if (!formData.contactInfo.businessAddress.city) {
      newErrors['contactInfo.businessAddress.city'] = 'City is required';
    }
    
    if (!formData.contactInfo.businessAddress.state) {
      newErrors['contactInfo.businessAddress.state'] = 'State is required';
    }
    
    if (!formData.contactInfo.businessAddress.pincode) {
      newErrors['contactInfo.businessAddress.pincode'] = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.contactInfo.businessAddress.pincode)) {
      newErrors['contactInfo.businessAddress.pincode'] = 'Please enter a valid 6-digit pincode';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create a properly structured data object for submission
      const submissionData = {
        businessInfo: {
          businessName: formData.businessName,
          businessType: formData.businessType,
          registrationNumber: formData.registrationNumber,
          gstNumber: formData.gstNumber,
          yearEstablished: formData.yearEstablished,
          description: formData.description
        },
        contactInfo: {
          businessAddress: {
            street: formData.contactInfo.businessAddress.street,
            city: formData.contactInfo.businessAddress.city,
            state: formData.contactInfo.businessAddress.state,
            pincode: formData.contactInfo.businessAddress.pincode,
            country: formData.contactInfo.businessAddress.country
          },
          businessEmail: formData.contactInfo.businessEmail,
          businessPhone: formData.contactInfo.businessPhone,
          website: formData.contactInfo.website,
          socialMedia: formData.contactInfo.socialMedia
        }
      };
      
      console.log('Submitting business info with address:', submissionData.contactInfo.businessAddress);
      onSubmit(submissionData);
    } else {
      toast.error('Please fix the errors in the form before submitting.');
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <FaBuilding className="text-primary mr-2" />
        Business Information
      </h2>
      
      {!dataLoaded && !initialData ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading your business information...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Business Name */}
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="businessName">
                Business Name*
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.businessName ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="Enter your business name"
                required
              />
              {errors.businessName && (
                <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>
              )}
            </div>
            
            {/* Business Type */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="businessType">
                Business Type*
              </label>
              <select
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.businessType ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                required
              >
                <option value="">Select business type</option>
                <option value="hostel">Hostel</option>
                <option value="mess">Mess</option>
                <option value="gym">Gym</option>
                <option value="multiple">Multiple</option>
              </select>
              {errors.businessType && (
                <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>
              )}
            </div>
            
            {/* Year Established */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="yearEstablished">
                Year Established
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <input
                  type="number"
                  id="yearEstablished"
                  name="yearEstablished"
                  value={formData.yearEstablished}
                  onChange={handleChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="YYYY"
                />
              </div>
            </div>
            
            {/* Registration Number */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="registrationNumber">
                Registration Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaFileAlt className="text-gray-400" />
                </div>
                <input
                  type="text"
                  id="registrationNumber"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  className="w-full pl-10 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter registration number (if applicable)"
                />
              </div>
            </div>
            
            {/* GST Number */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="gstNumber">
                GST Number
              </label>
              <input
                type="text"
                id="gstNumber"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter GST number (if applicable)"
              />
            </div>
            
            {/* Business Description */}
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
                Business Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Briefly describe your business"
              ></textarea>
            </div>
            
            {/* Address Section */}
            <div className="col-span-2 mt-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <FaMapMarkerAlt className="text-primary mr-2" />
                Business Address
              </h3>
            </div>
            
            {/* Street Address */}
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="contactInfo.businessAddress.street">
                Street Address
              </label>
              <input
                type="text"
                id="contactInfo.businessAddress.street"
                name="contactInfo.businessAddress.street"
                value={formData.contactInfo.businessAddress.street}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter street address"
              />
            </div>
            
            {/* City */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="contactInfo.businessAddress.city">
                City*
              </label>
              <input
                type="text"
                id="contactInfo.businessAddress.city"
                name="contactInfo.businessAddress.city"
                value={formData.contactInfo.businessAddress.city}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors['contactInfo.businessAddress.city'] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="Enter city"
                required
              />
              {errors['contactInfo.businessAddress.city'] && (
                <p className="text-red-500 text-xs mt-1">{errors['contactInfo.businessAddress.city']}</p>
              )}
            </div>
            
            {/* State */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="contactInfo.businessAddress.state">
                State*
              </label>
              <input
                type="text"
                id="contactInfo.businessAddress.state"
                name="contactInfo.businessAddress.state"
                value={formData.contactInfo.businessAddress.state}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors['contactInfo.businessAddress.state'] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="Enter state"
                required
              />
              {errors['contactInfo.businessAddress.state'] && (
                <p className="text-red-500 text-xs mt-1">{errors['contactInfo.businessAddress.state']}</p>
              )}
            </div>
            
            {/* Pincode */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="contactInfo.businessAddress.pincode">
                Pincode*
              </label>
              <input
                type="text"
                id="contactInfo.businessAddress.pincode"
                name="contactInfo.businessAddress.pincode"
                value={formData.contactInfo.businessAddress.pincode}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors['contactInfo.businessAddress.pincode'] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
                placeholder="Enter 6-digit pincode"
                required
              />
              {errors['contactInfo.businessAddress.pincode'] && (
                <p className="text-red-500 text-xs mt-1">{errors['contactInfo.businessAddress.pincode']}</p>
              )}
            </div>
            
            {/* Country */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="contactInfo.businessAddress.country">
                Country
              </label>
              <input
                type="text"
                id="contactInfo.businessAddress.country"
                name="contactInfo.businessAddress.country"
                value={formData.contactInfo.businessAddress.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter country"
                readOnly
              />
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex items-center font-medium shadow-md"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : 'Save Information'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BusinessInfoForm;
