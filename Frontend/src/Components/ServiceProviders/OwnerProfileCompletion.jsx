import React, { useEffect } from 'react';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';

const OwnerProfileCompletion = ({ completedSections, activeTab, setActiveTab }) => {
  // Define the sections of the profile
  const sections = [
    { id: 'personal', name: 'Personal Information' },
    { id: 'business', name: 'Business Information' },
    { id: 'property', name: 'Property Details' },
    { id: 'payment', name: 'Payment Settings' },
    { id: 'documents', name: 'Documents' }
  ];

  // For debugging
  useEffect(() => {
    console.log('OwnerProfileCompletion received:', completedSections);
  }, [completedSections]);

  // Calculate completion percentage
  const completedCount = completedSections ? Object.values(completedSections).filter(Boolean).length : 0;
  const totalSections = sections.length;
  const completionPercentage = Math.round((completedCount / totalSections) * 100);

  return (
    <div className="bg-white rounded-lg p-6 shadow-md mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Profile Completion</h2>
        <span className="text-lg font-bold text-blue-600">{completionPercentage}%</span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
          style={{ width: `${completionPercentage}%` }}
        ></div>
      </div>
      
      {/* Sections list */}
      <div className="space-y-3">
        {sections.map((section) => {
          const isCompleted = completedSections && completedSections[section.id];
          const isActive = activeTab === section.id;
          
          return (
            <div 
              key={section.id} 
              className={`flex items-center p-2 rounded-md cursor-pointer ${
                isActive ? 'bg-blue-600 bg-opacity-10' : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(section.id)}
            >
              {isCompleted ? (
                <FaCheckCircle className="text-blue-600 mr-2" />
              ) : (
                <FaRegCircle className="text-gray-400 mr-2" />
              )}
              <span className={`${isCompleted ? 'text-gray-800' : 'text-gray-500'} ${
                isActive ? 'font-medium' : ''
              }`}>
                {section.name}
              </span>
            </div>
          );
        })}
      </div>
      
      {completionPercentage < 100 && (
        <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-md">
          <p className="text-sm text-blue-800">
            Complete your profile to start listing your properties and receive bookings!
          </p>
        </div>
      )}
      
      {completionPercentage === 100 && (
        <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-md">
          <p className="text-sm text-blue-800 font-medium flex items-center">
            <FaCheckCircle className="mr-2" />
            Your profile is complete! You can now manage your listings and receive bookings.
          </p>
        </div>
      )}
    </div>
  );
};

export default OwnerProfileCompletion;
