import React, { useState } from "react";
import {
  FaHotel,
  FaDumbbell,
  FaCalendarAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBed,
  FaIceCream,
  FaUtensils,
  FaBuilding,
  FaUsers,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaClock,
  FaConciergeBell,
  FaWifi,
  FaParking,
  FaFilter,
  FaDollarSign,
  FaCheck,
} from "react-icons/fa";

export function BookingPage() {
  const [bookingType, setBookingType] = useState("");
  const [filters, setFilters] = useState({});
  const [location, setLocation] = useState("");

  // A big list of retailers/service providers
  const serviceProviders = [
    { id: 1, name: "Luxury Hotel", type: "hotel", location: "New York", amenities: ["WiFi", "Pool"], price: "$200/night" },
    { id: 2, name: "Premium Hostel", type: "hostel", location: "San Francisco", amenities: ["WiFi"], price: "$50/night" },
    { id: 3, name: "Affordable Gym", type: "gym", location: "Los Angeles", amenities: ["Personal Trainer"], price: "$100/month" },
    { id: 4, name: "Healthy Mess", type: "mess", location: "Chicago", amenities: ["Vegan Meals"], price: "$10/meal" },
    { id: 5, name: "Ice Cream Heaven", type: "iceCream", location: "New York", amenities: ["Vegan Options"], price: "$5/scoop" },
    { id: 6, name: "Breakfast Bliss", type: "breakfast", location: "Seattle", amenities: ["Coffee", "Omelette"], price: "$20/person" },
    { id: 7, name: "Cozy Hostel", type: "hostel", location: "Chicago", amenities: ["WiFi", "Shared Kitchen"], price: "$70/night" },
    { id: 8, name: "Fitness First Gym", type: "gym", location: "New York", amenities: ["WiFi", "Group Classes"], price: "$150/month" },
    { id: 9, name: "Sunny Ice Cream", type: "iceCream", location: "Los Angeles", amenities: ["Organic Ingredients"], price: "$8/scoop" },
    { id: 10, name: "Morning Glory Breakfast", type: "breakfast", location: "San Francisco", amenities: ["Pancakes", "Espresso"], price: "$25/person" },
  ];

  // Handle booking type selection
  const handleBookingTypeChange = (e) => {
    const value = e.target.value;
    setBookingType(value);
    setFilters({ ...filters, type: value });
  };

  // Update location filter
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);
    setFilters((prev) => ({ ...prev, location: value }));
  };

  // Filter providers based on user input
  const filteredProviders = serviceProviders.filter((provider) =>
    Object.keys(filters).every((key) =>
      provider[key]?.toString().toLowerCase().includes(filters[key]?.toString().toLowerCase() || "")
    )
  );

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen font-sans">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-5 animate-fade-in">
        <FaFilter className="text-blue-500 w-10 h-10 animate-bounce" />
        <span className="hover:text-blue-500 transition-all duration-300">
          Booking Form with Detailed Preferences
        </span>
      </h2>

      {/* Booking Form */}
      <form
        action="#"
        className="space-y-6 bg-white p-8 rounded-lg shadow-2xl hover:shadow-3xl transition-shadow duration-300"
      >
        {/* Booking Type */}
        <div>
          <label htmlFor="bookingType" className="flex items-center gap-2 font-medium text-gray-700">
            <FaFilter className="text-blue-500 w-6 h-6" />
            <span className="hover:text-blue-600 transition-all duration-300">Select Booking Type:</span>
          </label>
          <select
            id="bookingType"
            name="bookingType"
            onChange={handleBookingTypeChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          >
            <option value="">Select...</option>
            <option value="hotel">Hotel</option>
            <option value="gym">Gym</option>
            <option value="mess">Mess</option>
            <option value="hostel">Hostel Room</option>
            <option value="iceCream">Ice Cream Spot</option>
            <option value="breakfast">Breakfast Spot</option>
          </select>
        </div>

        {/* Location Field */}
        <div>
          <label htmlFor="location" className="flex items-center gap-2 font-medium text-gray-700">
            <FaMapMarkerAlt className="text-blue-500 w-6 h-6" />
            <span className="hover:text-blue-600 transition-all duration-300">Preferred Location:</span>
          </label>
          <select
            id="location"
            name="location"
            onChange={handleLocationChange}
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          >
            <option value="">Select Location</option>
            <option value="New York">New York</option>
            <option value="San Francisco">San Francisco</option>
            <option value="Chicago">Chicago</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Seattle">Seattle</option>
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label htmlFor="priceRange" className="flex items-center gap-2 font-medium text-gray-700">
            <FaDollarSign className="text-blue-500 w-6 h-6" />
            <span className="hover:text-blue-600 transition-all duration-300">Select Price Range:</span>
          </label>
          <select
            id="priceRange"
            name="priceRange"
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          >
            <option value="">Select...</option>
            <option value="$10/meal">$10/meal</option>
            <option value="$50/night">$50/night</option>
            <option value="$100/month">$100/month</option>
            <option value="$200/night">$200/night</option>
            <option value="$8/scoop">$8/scoop</option>
            <option value="$20/person">$20/person</option>
          </select>
        </div>

        {/* Amenities */}
        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700">
            <FaCheck className="text-blue-500 w-6 h-6" />
            <span className="hover:text-blue-600 transition-all duration-300">Select Amenities:</span>
          </label>
          <div className="flex items-center gap-4 mt-2">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                name="wifi"
                onChange={(e) => setFilters((prev) => ({ ...prev, amenities: "WiFi" }))}
                className="form-checkbox text-blue-500"
              />
              <FaWifi className="text-blue-500" /> WiFi
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                name="vegan"
                onChange={(e) => setFilters((prev) => ({ ...prev, amenities: "Vegan" }))}
                className="form-checkbox text-blue-500"
              />
              Vegan Meals
            </label>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                name="pool"
                onChange={(e) => setFilters((prev) => ({ ...prev, amenities: "Pool" }))}
                className="form-checkbox text-blue-500"
              />
              Pool
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-md flex items-center justify-center gap-2 hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300"
        >
          <FaPaperPlane className="w-6 h-6" />
          <span className="font-semibold">Submit Booking</span>
        </button>
      </form>

      {/* Filtered Providers */}
      <div className="mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaFilter className="text-blue-500" /> Filtered Providers
        </h3>
        <ul className="space-y-4">
          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider) => (
              <li
                key={provider.id}
                className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-all"
              >
                <h4 className="text-lg font-semibold text-blue-600">{provider.name}</h4>
                <p className="text-gray-700">Type: {provider.type}</p>
                <p className="text-gray-700">Location: {provider.location}</p>
                <p className="text-gray-700">Amenities: {provider.amenities.join(", ")}</p>
                <p className="text-gray-700">Price: {provider.price}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No providers match your criteria.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default BookingPage;
