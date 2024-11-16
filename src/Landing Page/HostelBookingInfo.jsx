import React from "react";

export default function HostelBookingInfo() {
  return (
    <div className="bg-gray-100 w-full relative">
      <div className="ml-[30%]  text-gray-800 p-6 ">
        <div className="text-center mb-8 ">
          <h1 className="text-4xl font-bold text-blue-600 ">
            CampusCove Hostel Finder
          </h1>
          <p className="mt-4 text-lg">
            Finding the perfect hostel has never been easier. Whether you're a
            student moving to a new city or looking to upgrade your
            accommodation, CampusCove provides a hassle-free way to explore and
            book hostels tailored to your needs.
          </p>
        </div>

        <div className=" grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">
              Comprehensive Listings
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Explore a wide range of hostels with detailed information about
                room types, amenities, and pricing.
              </li>
              <li>
                View photos and descriptions to get a clear picture of your
                options.
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">
              Search by Location
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Use our location-based search to discover hostels close to your
                college or workplace.
              </li>
              <li>
                Filter results by distance, budget, and facilities for a
                personalized experience.
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">
              Amenities at a Glance
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Find hostels offering essential amenities like Wi-Fi, laundry,
                and meals.
              </li>
              <li>
                Check for extra facilities such as study rooms, gyms, or
                recreational areas.
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">
              Verified Reviews and Ratings
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Read honest feedback from other users to make informed
                decisions.
              </li>
              <li>
                Leave your own reviews to help others find the right place.
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">
              Affordable Pricing
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Compare room prices to find an option that fits your budget.
              </li>
              <li>
                Get exclusive student discounts and offers through CampusCove.
              </li>
            </ul>
          </div>

          {/* Hassle-Free Booking */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-blue-500 mb-4">
              Hassle-Free Booking
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Book your hostel directly through our platform with instant
                confirmation.
              </li>
              <li>
                Secure payment options make the process smooth and reliable.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
