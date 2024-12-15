import React from "react";

export default function MessBookingInfo() {
  return (
    <div className="bg-white text-gray-800 py-12">
    
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-600">
          Easy Mess Bookings
        </h1>
        <p className="mt-4 text-lg">
          With CampusCove, booking your mess services is as easy as following a
          simple process. Enjoy seamless meal management without confusion!
        </p>
      </div>

      <div className="flex flex-col items-center gap-12">

        <div className="flex items-center">
          <div className="bg-green-500 text-white w-14 h-14 flex items-center justify-center rounded-full text-xl font-bold">
            1
          </div>
          <div className="ml-6">
            <h2 className="text-xl font-semibold text-green-600">
              Browse Meal Plans
            </h2>
            <p className="mt-2 text-sm">
              Explore available mess options and select meal plans that match
              your dietary needs.
            </p>
          </div>
        </div>

        <div className="w-1 bg-green-500 h-12"></div>

        <div className="flex items-center">
          <div className="bg-green-500 text-white w-14 h-14 flex items-center justify-center rounded-full text-xl font-bold">
            2
          </div>
          <div className="ml-6">
            <h2 className="text-xl font-semibold text-green-600">
              Customize Your Subscription
            </h2>
            <p className="mt-2 text-sm">
              Choose subscription durations, modify plans, and personalize your
              schedule.
            </p>
          </div>
        </div>

        <div className="w-1 bg-green-500 h-12"></div>

        <div className="flex items-center">
          <div className="bg-green-500 text-white w-14 h-14 flex items-center justify-center rounded-full text-xl font-bold">
            3
          </div>
          <div className="ml-6">
            <h2 className="text-xl font-semibold text-green-600">
              Confirm and Pay
            </h2>
            <p className="mt-2 text-sm">
              Use secure payment options to confirm your booking and lock in
              your meal plan.
            </p>
          </div>
        </div>

        <div className="w-1 bg-green-500 h-12"></div>

        <div className="flex items-center">
          <div className="bg-green-500 text-white w-14 h-14 flex items-center justify-center rounded-full text-xl font-bold">
            4
          </div>
          <div className="ml-6">
            <h2 className="text-xl font-semibold text-green-600">
              Track and Enjoy
            </h2>
            <p className="mt-2 text-sm">
              Access your meal schedule, track usage, and enjoy a hassle-free
              dining experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
