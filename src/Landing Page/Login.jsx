import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-100 via-blue-50 to-green-100"></div>

      {/* Container */}
    <div className="relative z-10 flex w-full max-w-[90%] h-[90vh] bg-white bg-opacity-10 backdrop-blur-lg shadow-xl rounded-lg overflow-hidden">
        {/* Form Section */}
        <form className="w-full md:w-3/5 p-8 bg-white">
          <h2 className="text-3xl font-bold text-green-600 text-center mb-8">
            Login-form
          </h2>


          <div className="relative mb-6">
            <input
              type="usename"
              id="usename"
              required
              placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-gray-400 focus:border-green-600 focus:outline-none text-gray-800 py-5 placeholder-transparent"
            />
            <label
              htmlFor="username"
              className="absolute left-0 top-2 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-600"
            >
              Enter username
            </label>
          </div>



          {/* Email Input */}
          <div className="relative mb-6">
            <input
              type="email"
              id="email"
              required
              placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-gray-400 focus:border-green-600 focus:outline-none text-gray-800 py-5 placeholder-transparent"
            />
            <label
              htmlFor="email"
              className="absolute left-0 top-2 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-600"
            >
              Enter email
            </label>
          </div>

          {/* Password Input */}
          <div className="relative mb-6">
            <input
              type="password"
              id="password"
              required
              placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-gray-400 focus:border-green-600 focus:outline-none text-gray-800 py-5 placeholder-transparent"
            />
            <label
              htmlFor="password"
              className="absolute left-0 top-2 text-gray-400 text-sm transition-all duration-300 peer-placeholder-shown:top-6 peer-placeholder-shown:text-lg peer-focus:top-0 peer-focus:text-sm peer-focus:text-green-600"
            >
              Enter password
            </label>
          </div>

          {/* Save Info & Forgot Password */}
          <div className="flex justify-between items-center mb-6 text-gray-500 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-green-600 focus:ring-green-500 rounded"
              />
              <span>Save login information</span>
            </label>
            <a
              href="#"
              className="text-green-600 hover:text-green-500 transition duration-300"
            >
              Forgot password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-lg py-3 rounded-lg transition duration-300"
          >
            Log In
          </button>

          {/* Create Account Section */}
          <div className="text-center mt-6 text-gray-500">
            <p>
              Don&apos;t have an account?{" "}
              <a
                href="#"
                className="text-green-600 hover:text-green-500 transition duration-300"
              >
                Create account
              </a>
            </p>
          </div>
        </form>

        {/* Image Section */}
        <div className="w-2/5  hidden md:block">
          <img
            src="https://i.pinimg.com/736x/d1/54/66/d154660a6ae3104de2b0a314667a5ab6.jpg"
            alt="Delivery Illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}