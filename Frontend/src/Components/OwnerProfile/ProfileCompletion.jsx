import React, { useEffect } from 'react';
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa';

export default function ProfileCompletion({ completedSections }) {
  // Define the sections of the profile
  const sections = [
    { id: 'personal', name: 'Personal Information' },
    { id: 'business', name: 'Business Information' },
    { id: 'payment', name: 'Payment Settings' },
    { id: 'preferences', name: 'Preferences' },
    { id: 'documents', name: 'Documents' }
  ];

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
          
          return (
            <div key={section.id} className="flex items-center">
              {isCompleted ? (
                <FaCheckCircle className="text-blue-600 mr-2" />
              ) : (
                <FaRegCircle className="text-gray-400 mr-2" />
              )}
              <span className={`${isCompleted ? 'text-gray-800' : 'text-gray-500'}`}>
                {section.name}
              </span>
            </div>
          );
        })}
      </div>
      
      {completionPercentage < 100 && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm text-blue-700">
          Complete your profile to improve visibility and gain customer trust.
        </div>
      )}
      
      {completionPercentage === 100 && (
        <div className="mt-4 p-3 bg-green-50 rounded-md text-sm text-green-700">
          Great job! Your profile is complete and ready for customers.
        </div>
      )}
    </div>
  );
}
