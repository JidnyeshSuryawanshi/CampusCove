import React, { useState, useEffect } from 'react';
import { FaHome, FaBed, FaUtensils, FaDumbbell, FaWifi, FaParking, FaWater, FaChair } from 'react-icons/fa';
import { updateOwnerPropertyDetails } from '../../../utils/api';
import { toast } from 'react-toastify';

export default function PropertyDetailsForm({ initialData, businessType, onSubmit, loading: externalLoading }) {
  const [formData, setFormData] = useState({
    propertyTypes: [],
    totalProperties: 0,
    amenities: {
      wifi: false,
      parking: false,
      hotWater: false,
      ac: false,
      tv: false,
      refrigerator: false,
      laundry: false,
      kitchen: false,
      securityCamera: false
    },
    nearbyFacilities: [],
    distanceFromCampus: '',
    totalCapacity: 0
  });
  const [loading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (initialData && initialData.propertyDetails) {
      setFormData({
        propertyTypes: initialData.propertyDetails.propertyTypes || [],
        totalProperties: initialData.propertyDetails.totalProperties || 0,
        amenities: {
          wifi: initialData.propertyDetails.amenities?.wifi || false,
          parking: initialData.propertyDetails.amenities?.parking || false,
          hotWater: initialData.propertyDetails.amenities?.hotWater || false,
          ac: initialData.propertyDetails.amenities?.ac || false,
          tv: initialData.propertyDetails.amenities?.tv || false,
          refrigerator: initialData.propertyDetails.amenities?.refrigerator || false,
          laundry: initialData.propertyDetails.amenities?.laundry || false,
          kitchen: initialData.propertyDetails.amenities?.kitchen || false,
          securityCamera: initialData.propertyDetails.amenities?.securityCamera || false
        },
        nearbyFacilities: initialData.propertyDetails.nearbyFacilities || [],
        distanceFromCampus: initialData.propertyDetails.distanceFromCampus || '',
        totalCapacity: initialData.propertyDetails.totalCapacity || 0
      });
      console.log('Loaded property details:', initialData.propertyDetails);
      setDataLoaded(true);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('amenities.')) {
      const amenityName = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          [amenityName]: checked
        }
      }));
    } else if (name === 'propertyTypes' || name === 'nearbyFacilities') {
      // Handle multi-select
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
      setFormData(prev => ({
        ...prev,
        [name]: selectedOptions
      }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value, 10) || 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await updateOwnerPropertyDetails(formData);
      
      if (response.success) {
        toast.success('Property details updated successfully');
        if (onSubmit) {
          onSubmit(formData);
        }
      } else {
        toast.error(response.error || 'Failed to update property details');
      }
    } catch (error) {
      console.error('Error updating property details:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <FaHome className="text-blue-600 mr-2" />
        Property Details
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Property Types */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="propertyTypes">
              Property Types*
            </label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="hostel"
                  checked={formData.propertyTypes.includes('hostel')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData(prev => ({
                        ...prev,
                        propertyTypes: [...prev.propertyTypes, 'hostel']
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        propertyTypes: prev.propertyTypes.filter(type => type !== 'hostel')
                      }));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="hostel" className="ml-2 text-gray-700 flex items-center">
                  <FaBed className="mr-1" /> Hostel
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="mess"
                  checked={formData.propertyTypes.includes('mess')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData(prev => ({
                        ...prev,
                        propertyTypes: [...prev.propertyTypes, 'mess']
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        propertyTypes: prev.propertyTypes.filter(type => type !== 'mess')
                      }));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="mess" className="ml-2 text-gray-700 flex items-center">
                  <FaUtensils className="mr-1" /> Mess
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="gym"
                  checked={formData.propertyTypes.includes('gym')}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData(prev => ({
                        ...prev,
                        propertyTypes: [...prev.propertyTypes, 'gym']
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        propertyTypes: prev.propertyTypes.filter(type => type !== 'gym')
                      }));
                    }
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="gym" className="ml-2 text-gray-700 flex items-center">
                  <FaDumbbell className="mr-1" /> Gym
                </label>
              </div>
            </div>
          </div>
          
          {/* Total Properties */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="totalProperties">
              Total Properties*
            </label>
            <input
              type="number"
              id="totalProperties"
              name="totalProperties"
              value={formData.totalProperties}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter total number of properties"
              min="1"
              required
            />
          </div>
          
          {/* Total Capacity */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="totalCapacity">
              Total Capacity*
            </label>
            <input
              type="number"
              id="totalCapacity"
              name="totalCapacity"
              value={formData.totalCapacity}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter total capacity"
              min="1"
              required
            />
          </div>
          
          {/* Distance from Campus */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="distanceFromCampus">
              Distance from Campus (km)*
            </label>
            <input
              type="text"
              id="distanceFromCampus"
              name="distanceFromCampus"
              value={formData.distanceFromCampus}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter distance in kilometers"
              required
            />
          </div>
          
          {/* Nearby Facilities */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="nearbyFacilities">
              Nearby Facilities
            </label>
            <select
              id="nearbyFacilities"
              name="nearbyFacilities"
              multiple
              value={formData.nearbyFacilities}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              size="4"
            >
              <option value="hospital">Hospital</option>
              <option value="supermarket">Supermarket</option>
              <option value="restaurant">Restaurant</option>
              <option value="park">Park</option>
              <option value="bank">Bank/ATM</option>
              <option value="busStop">Bus Stop</option>
              <option value="railwayStation">Railway Station</option>
              <option value="pharmacy">Pharmacy</option>
            </select>
            <p className="text-sm text-gray-500 mt-1">Hold Ctrl (or Cmd) to select multiple options</p>
          </div>
          
          {/* Amenities */}
          <div className="col-span-2">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="amenities.wifi"
                  name="amenities.wifi"
                  checked={formData.amenities.wifi}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="amenities.wifi" className="ml-2 text-gray-700 flex items-center">
                  <FaWifi className="mr-1" /> WiFi
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="amenities.parking"
                  name="amenities.parking"
                  checked={formData.amenities.parking}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="amenities.parking" className="ml-2 text-gray-700 flex items-center">
                  <FaParking className="mr-1" /> Parking
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="amenities.hotWater"
                  name="amenities.hotWater"
                  checked={formData.amenities.hotWater}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="amenities.hotWater" className="ml-2 text-gray-700 flex items-center">
                  <FaWater className="mr-1" /> Hot Water
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="amenities.ac"
                  name="amenities.ac"
                  checked={formData.amenities.ac}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="amenities.ac" className="ml-2 text-gray-700">
                  AC
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="amenities.tv"
                  name="amenities.tv"
                  checked={formData.amenities.tv}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="amenities.tv" className="ml-2 text-gray-700">
                  TV
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="amenities.refrigerator"
                  name="amenities.refrigerator"
                  checked={formData.amenities.refrigerator}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="amenities.refrigerator" className="ml-2 text-gray-700">
                  Refrigerator
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="amenities.laundry"
                  name="amenities.laundry"
                  checked={formData.amenities.laundry}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="amenities.laundry" className="ml-2 text-gray-700">
                  Laundry
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="amenities.kitchen"
                  name="amenities.kitchen"
                  checked={formData.amenities.kitchen}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="amenities.kitchen" className="ml-2 text-gray-700">
                  Kitchen
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="amenities.securityCamera"
                  name="amenities.securityCamera"
                  checked={formData.amenities.securityCamera}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="amenities.securityCamera" className="ml-2 text-gray-700">
                  Security Camera
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors flex items-center font-medium shadow-md"
            disabled={loading || externalLoading}
          >
            {(loading || externalLoading) ? (
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
    </div>
  );
}
