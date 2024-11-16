import React from "react";

export default function MessBookingInfo() {
  return (
    <div className="bg-white text-gray-800 p-6 sm:p-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-600">
          Easy Mess Bookings
        </h1>
        <p className="mt-4 text-lg">
          With CampusCove, you can easily book your mess services for the month.
          No more confusion about meal plans!
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-500 mb-4">
            Hassle-Free Meal Plans
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Select meal plans that suit your dietary preferences.</li>
            <li>Modify your plan anytime based on your schedule.</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-500 mb-4">
            Monthly Subscriptions
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Subscribe to mess services on a monthly basis.</li>
            <li>Enjoy the flexibility to renew or switch plans seamlessly.</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-500 mb-4">
            Affordable Pricing
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Compare mess rates to find the best deal for your budget.</li>
            <li>Avail exclusive discounts for students through CampusCove.</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-500 mb-4">
            Reliable Feedback
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Read reviews about mess services from other students.</li>
            <li>Share your own experiences to help others.</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-500 mb-4">
            Meal Schedule Management
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Plan your meals for the week or month in advance.</li>
            <li>Track your meal plan and make updates anytime.</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-green-500 mb-4">
            Flexible Cancellations
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Cancel or pause your subscription without hassle.</li>
            <li>Get timely refunds for unused meal credits.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
