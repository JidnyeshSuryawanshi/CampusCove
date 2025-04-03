import React from 'react';

export default function MessServices() {
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Mess Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Mess Card */}
          <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              {/* Add mess image here */}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">Sample Mess</h3>
              <p className="text-sm text-gray-500 mt-1">Location: Campus Area</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-green-600 font-semibold">₹2500/month</span>
                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                  View Details
                </button>
              </div>
            </div>
          </div>
          {/* Add more mess cards here */}
        </div>
      </div>
    </div>
  );
}
