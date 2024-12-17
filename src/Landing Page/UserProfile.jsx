import React, { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaUser, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const UserProfile = () => {
  // Initial user details
  const [userDetails, setUserDetails] = useState({
    name: 'Ajay Singhaniya',
    contact: 'ajay.singhaniya@example.com',
    bio: 'I am the owner of the best hostel in town. We provide affordable rooms and delicious meals to travelers.',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    phone: '123-456-7890',
    address: '456 Elm Street, Cityville, State, 67890',
    socialLinks: {
      facebook: 'https://facebook.com/ajay.singhaniya',
      twitter: 'https://twitter.com/ajay.singhaniya',
      instagram: 'https://instagram.com/ajay.singhaniya',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-[90%] mx-auto bg-white p-6 rounded-lg shadow-xl">
        {/* User Info */}
        <div className="flex items-center mb-8">
          <img 
            src={userDetails.avatar} 
            alt="User Avatar" 
            className="w-24 h-24 rounded-full mr-6 shadow-lg object-cover" 
          />
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
                className="text-3xl font-semibold text-gray-800 bg-transparent focus:outline-none"
              />
            </h1>
            <p className="text-gray-600">
              <input
                type="email"
                name="contact"
                value={userDetails.contact}
                onChange={handleChange}
                className="text-gray-600 bg-transparent focus:outline-none"
              />
            </p>
            <p className="text-gray-600 mt-2">
              <input
                type="text"
                name="bio"
                value={userDetails.bio}
                onChange={handleChange}
                className="text-gray-600 bg-transparent focus:outline-none"
              />
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-700">Phone</h3>
            <input
              type="text"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              className="text-2xl font-bold text-blue-600 bg-transparent focus:outline-none w-full"
            />
          </div>
          <div className="bg-blue-100 p-6 rounded-lg shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-700">Address</h3>
            <input
              type="text"
              name="address"
              value={userDetails.address}
              onChange={handleChange}
              className="text-2xl font-bold text-blue-600 bg-transparent focus:outline-none w-full"
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white p-6 rounded-lg shadow-2xl mb-8">
          <h3 className="text-xl font-semibold text-gray-700">Social Media Links</h3>
          <ul className="space-y-2">
            <li>
              <FaFacebook className="inline mr-2 text-blue-600" />
              <input
                type="url"
                name="facebook"
                value={userDetails.socialLinks.facebook}
                onChange={handleChange}
                placeholder="Facebook"
                className="text-blue-600 bg-transparent focus:outline-none w-full"
              />
            </li>
            <li>
              <FaTwitter className="inline mr-2 text-blue-400" />
              <input
                type="url"
                name="twitter"
                value={userDetails.socialLinks.twitter}
                onChange={handleChange}
                placeholder="Twitter"
                className="text-blue-400 bg-transparent focus:outline-none w-full"
              />
            </li>
            <li>
              <FaInstagram className="inline mr-2 text-pink-600" />
              <input
                type="url"
                name="instagram"
                value={userDetails.socialLinks.instagram}
                onChange={handleChange}
                placeholder="Instagram"
                className="text-pink-600 bg-transparent focus:outline-none w-full"
              />
            </li>
          </ul>
        </div>

        {/* Save Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => alert('Profile Updated!')}
            className="bg-green-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
