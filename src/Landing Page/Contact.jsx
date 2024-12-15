import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen w-full bg-blue-50 shadow-lg rounded-lg flex items-center justify-center px-4 py-8">
      {/* Container Section */}
      <div className="bg-white shadow-lg rounded-lg w-[90%] max-w-screen-[90%] flex flex-col">
        {/* Header Section Inside Container */}
        <div className="text-center mt-8 mb-4 px-4">
          <h2 className="text-4xl font-semibold text-gray-600 mb-2">
            CONTACT <span className="text-blue-500">US</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Fill out the form below to send us a message.
          </p>
        </div>

        {/* Form and Image Section */}
        <div className="flex flex-col md:flex-row items-stretch">
          {/* Form Container */}
          <div className="w-full md:w-3/5 p-8">
            <form
              action="https://formspree.io/f/xrbgvvde"
              method="post"
              className="space-y-6"
            >
              {/* Name Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-gray-700 font-medium mb-2"
                >
                  Enter Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="e.g., Rohit Sharma"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-gray-700 font-medium mb-2"
                >
                  Enter Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="e.g., rohit264@gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Company Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="company"
                  className="text-gray-700 font-medium mb-2"
                >
                  Enter Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  placeholder="e.g., Mom's Kitchen, AIMFIT, GOKUL"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Subject Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="subject"
                  className="text-gray-700 font-medium mb-2"
                >
                  Enter Purpose / Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  placeholder="e.g., Suggestion"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Message Input */}
              <div className="flex flex-col">
                <label
                  htmlFor="message"
                  className="text-gray-700 font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  required
                  placeholder="Any suggestions or your personal queries..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                ></textarea>
              </div>

              {/* Submit Button Centered */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 hover:shadow-lg"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-2/5">
            <img
              src="https://i.pinimg.com/736x/ad/20/7a/ad207a674e67ef63ade2412d8090aa15.jpg"
              alt="Delivery Illustration"
              className="w-full h-full object-cover rounded-r-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
