import React, { useState, useEffect } from 'react';
import { FaCog, FaBell, FaCalendarAlt } from 'react-icons/fa';

export default function PreferencesForm({ initialData, onSave, loading }) {
  const [formData, setFormData] = useState({
    bookingPreferences: {
      autoAcceptBookings: false,
      minimumStayDuration: '1',
      advanceBookingDays: '7',
      instantPaymentRequired: false
    },
    notificationSettings: {
      emailNotifications: true,
      smsNotifications: false,
      bookingAlerts: true,
      paymentAlerts: true,
      marketingUpdates: false
    },
    displaySettings: {
      showContactInfo: true,
      showPricing: true,
      featuredListing: false
    }
  });

  useEffect(() => {
    if (initialData && initialData.preferences) {
      // Deep merge the initial data with default values
      setFormData({
        bookingPreferences: {
          ...formData.bookingPreferences,
          ...(initialData.preferences.bookingPreferences || {})
        },
        notificationSettings: {
          ...formData.notificationSettings,
          ...(initialData.preferences.notificationSettings || {})
        },
        displaySettings: {
          ...formData.displaySettings,
          ...(initialData.preferences.displaySettings || {})
        }
      });
    }
  }, [initialData]);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
        <FaCog className="text-blue-600 mr-2" />
        Preferences
      </h2>
      
      <form onSubmit={handleSubmit}>
        {/* Booking Preferences */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <FaCalendarAlt className="text-blue-500 mr-2" />
            Booking Preferences
          </h3>
          
          <div className="space-y-4 pl-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoAcceptBookings"
                checked={formData.bookingPreferences.autoAcceptBookings}
                onChange={(e) => handleChange('bookingPreferences', 'autoAcceptBookings', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="autoAcceptBookings" className="ml-2 block text-sm text-gray-700">
                Automatically accept bookings
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="instantPaymentRequired"
                checked={formData.bookingPreferences.instantPaymentRequired}
                onChange={(e) => handleChange('bookingPreferences', 'instantPaymentRequired', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="instantPaymentRequired" className="ml-2 block text-sm text-gray-700">
                Require instant payment for bookings
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="minimumStayDuration" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum stay duration (days)
                </label>
                <select
                  id="minimumStayDuration"
                  value={formData.bookingPreferences.minimumStayDuration}
                  onChange={(e) => handleChange('bookingPreferences', 'minimumStayDuration', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="1">1 day</option>
                  <option value="2">2 days</option>
                  <option value="3">3 days</option>
                  <option value="7">1 week</option>
                  <option value="30">1 month</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="advanceBookingDays" className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum advance booking (days)
                </label>
                <select
                  id="advanceBookingDays"
                  value={formData.bookingPreferences.advanceBookingDays}
                  onChange={(e) => handleChange('bookingPreferences', 'advanceBookingDays', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="7">7 days</option>
                  <option value="14">14 days</option>
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notification Settings */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center">
            <FaBell className="text-blue-500 mr-2" />
            Notification Settings
          </h3>
          
          <div className="space-y-4 pl-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="emailNotifications"
                checked={formData.notificationSettings.emailNotifications}
                onChange={(e) => handleChange('notificationSettings', 'emailNotifications', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="emailNotifications" className="ml-2 block text-sm text-gray-700">
                Email notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="smsNotifications"
                checked={formData.notificationSettings.smsNotifications}
                onChange={(e) => handleChange('notificationSettings', 'smsNotifications', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="smsNotifications" className="ml-2 block text-sm text-gray-700">
                SMS notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="bookingAlerts"
                checked={formData.notificationSettings.bookingAlerts}
                onChange={(e) => handleChange('notificationSettings', 'bookingAlerts', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="bookingAlerts" className="ml-2 block text-sm text-gray-700">
                Booking alerts
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="paymentAlerts"
                checked={formData.notificationSettings.paymentAlerts}
                onChange={(e) => handleChange('notificationSettings', 'paymentAlerts', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="paymentAlerts" className="ml-2 block text-sm text-gray-700">
                Payment alerts
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="marketingUpdates"
                checked={formData.notificationSettings.marketingUpdates}
                onChange={(e) => handleChange('notificationSettings', 'marketingUpdates', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="marketingUpdates" className="ml-2 block text-sm text-gray-700">
                Marketing updates
              </label>
            </div>
          </div>
        </div>
        
        {/* Display Settings */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Display Settings
          </h3>
          
          <div className="space-y-4 pl-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showContactInfo"
                checked={formData.displaySettings.showContactInfo}
                onChange={(e) => handleChange('displaySettings', 'showContactInfo', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showContactInfo" className="ml-2 block text-sm text-gray-700">
                Show contact information on listings
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="showPricing"
                checked={formData.displaySettings.showPricing}
                onChange={(e) => handleChange('displaySettings', 'showPricing', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="showPricing" className="ml-2 block text-sm text-gray-700">
                Show pricing on listings
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featuredListing"
                checked={formData.displaySettings.featuredListing}
                onChange={(e) => handleChange('displaySettings', 'featuredListing', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="featuredListing" className="ml-2 block text-sm text-gray-700">
                Feature my listings (may incur additional charges)
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 flex items-center"
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
            ) : (
              'Save Preferences'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
