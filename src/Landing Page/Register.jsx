import React, { useState } from "react";
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaHome, 
  FaPaperPlane, 
  FaCamera, 
  FaFileUpload, 
  FaBirthdayCake, 
  FaTransgender, 
  FaFlag, 
  FaLanguage, 
  FaSchool, 
  FaInfoCircle
} from "react-icons/fa";

export function Register() {
  const [userType, setUserType] = useState("");

  // Handle user type changes
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  // Preview uploaded photos
  const previewPhotos = (e) => {
    const fileInput = e.target;
    const previewContainer = document.getElementById("photoPreview");
    previewContainer.innerHTML = ""; // Clear previous previews

    Array.from(fileInput.files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.className =
          "w-24 h-24 border-2 border-gray-300 rounded-lg m-2 transform transition-transform hover:scale-105 duration-300 shadow-md";
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="p-8 bg-gradient-to-br from-green-50 to-green-100 min-h-screen font-sans">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-5 animate-fade-in">
        <FaUser className="text-green-500 w-10 h-10 animate-bounce" />
        <span className="transition-all duration-300 hover:text-green-500">Personal Information Form</span>
      </h2>
      
      <form
        action="submit_form.php"
        method="POST"
        encType="multipart/form-data"
        className="space-y-6 bg-white p-8 rounded-lg shadow-2xl hover:shadow-3xl transition-shadow duration-300"
      >
        {/* User Type */}
        <div>
          <label htmlFor="userType" className="flex items-center gap-2 font-medium text-gray-700">
            <FaUser className="text-green-500 w-6 h-6" />
            <span className="hover:text-green-600 transition-all duration-300">Select User Type:</span>
          </label>
          <select
            id="userType"
            name="userType"
            onChange={handleUserTypeChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
          >
            <option value="">Select...</option>
            <option value="hostelOwner">Hostel Owner</option>
            <option value="messOwner">Mess Owner</option>
            <option value="gymOwner">Gym Owner</option>
            <option value="student">Student</option>
          </select>
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="flex items-center gap-2 font-medium text-gray-700">
            <FaUser className="text-green-500 w-6 h-6" />
            <span className="hover:text-green-600 transition-all duration-300">Full Name:</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="flex items-center gap-2 font-medium text-gray-700">
            <FaEnvelope className="text-green-500 w-6 h-6" />
            <span className="hover:text-green-600 transition-all duration-300">Email:</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="flex items-center gap-2 font-medium text-gray-700">
            <FaPhone className="text-green-500 w-6 h-6" />
            <span className="hover:text-green-600 transition-all duration-300">Phone Number:</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter your phone number"
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="flex items-center gap-2 font-medium text-gray-700">
            <FaHome className="text-green-500 w-6 h-6" />
            <span className="hover:text-green-600 transition-all duration-300">Address:</span>
          </label>
          <textarea
            id="address"
            name="address"
            placeholder="Enter your address"
            rows="3"
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
          ></textarea>
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dob" className="flex items-center gap-2 font-medium text-gray-700">
            <FaBirthdayCake className="text-green-500 w-6 h-6" />
            <span className="hover:text-green-600 transition-all duration-300">Date of Birth:</span>
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
          />
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="flex items-center gap-2 font-medium text-gray-700">
            <FaTransgender className="text-green-500 w-6 h-6" />
            <span className="hover:text-green-600 transition-all duration-300">Gender:</span>
          </label>
          <select
            id="gender"
            name="gender"
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
          >
            <option value="">Select Gender...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="gay">gay</option>
            <option value="lesbin">lesbin</option>
            <option value="sofware">Software</option>
            <option value="lgbt">LGBTQ+</option>
          </select>
        </div>
 {/* Photo Upload */}
 <div>
          <label htmlFor="photo" className="flex items-center gap-2 font-medium text-gray-700">
            <FaCamera className="text-green-500 w-6 h-6" />
            <span className="hover:text-green-600 transition-all duration-300">Upload Photo:</span>
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            required
            className="block mt-1 hover:cursor-pointer hover:text-green-500"
          />
        </div>

        {/* Additional Photos */}
        <div>
          <label htmlFor="photos" className="flex items-center gap-2 font-medium text-gray-700">
            <FaFileUpload className="text-green-500 w-6 h-6" />
            <span className="hover:text-green-600 transition-all duration-300">Upload Additional Photos:</span>
          </label>
          <input
            type="file"
            id="photos"
            name="photos[]"
            accept="image/*"
            multiple
            onChange={previewPhotos}
            className="block mt-1 hover:cursor-pointer hover:text-green-500"
          />
        </div>

        
        {/* Nationality */}
        <div>
          <label htmlFor="nationality" className="flex items-center gap-2 font-medium text-gray-700">
            <FaFlag className="text-green-500 w-6 h-6" />
            <span className="hover:text-green-600 transition-all duration-300">Nationality:</span>
          </label>
          <input
            type="text"
            id="nationality"
            name="nationality"
            placeholder="Enter your nationality"
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
          />
        </div>

        {/* Preferred Language */}
        <div>
          <label htmlFor="language" className="flex items-center gap-2 font-medium text-gray-700">
            <FaLanguage className="text-green-500 w-6 h-6" />
            <span className="hover:text-green-600 transition-all duration-300">Preferred Language:</span>
          </label>
          <input
            type="text"
            id="language"
            name="language"
            placeholder="Enter your preferred language"
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
          />
        </div>

        {/* Educational Qualifications */}
        <div>
          <label htmlFor="education" className="flex items-center gap-2 font-medium text-gray-700">
            <FaSchool className="text-green-500 w-6 h-6" />
            <span className="hover:text-green-600 transition-all duration-300">Educational Qualifications:</span>
          </label>
          <input
            type="text"
            id="education"
            name="education"
            placeholder="Enter your highest qualification"
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
          />
        </div>

        {/* Emergency Contact */}
        <div>
          <label htmlFor="emergencyContact" className="flex items-center gap-2 font-medium text-gray-700">
            <FaPhone className="text-green-500 w-6 h-6" />
            <span className="hover:text-green-600 transition-all duration-300">Emergency Contact:</span>
          </label>
          <input
            type="tel"
            id="emergencyContact"
            name="emergencyContact"
            placeholder="Enter emergency contact number"
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all"
          />
        </div>
<br />
        {/* Terms and Conditions */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="terms"
            name="terms"
            required
            className="form-checkbox text-green-500"
          />
          <label htmlFor="terms" className="text-gray-700">
            I agree to the <span className="text-green-500">Terms and Conditions</span>
          </label>
        </div>

       <br />
       <br />

        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-md flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300"
        >
          <FaPaperPlane className="w-6 h-6" />
          <span className="font-semibold">Submit</span>
        </button>
      </form>
    </div>
  );
}

export default Register;
