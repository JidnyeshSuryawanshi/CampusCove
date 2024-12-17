import React from "react";
import { FaHome, FaInfoCircle, FaServicestack, FaQuestionCircle, FaPhoneAlt, FaRegUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <div>
      <nav className="bg-blue-50 w-full h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <img
            className="w-12 h-12 rounded-full object-cover"
            src="/New_Logo.PNG"
            alt="My_Logo"
          />
          <h1 className="font-Nutino text-blue-400 font-bold text-3xl">
            Campus<span className="text-blue-300">Cove</span>
          </h1>
        </div>
        <div className="flex gap-6 items-center text-slate-50 text-lg font-Nutino">
          <div className="flex items-center gap-2 text-blue-400 hover:text-blue-500 cursor-pointer hover:text-xl transition-all">
            <FaHome className="text-2xl" />
            <h1>Home</h1>
          </div>
          <div className="flex items-center gap-2 text-blue-400 hover:text-blue-500 cursor-pointer hover:text-xl transition-all">
            <FaInfoCircle className="text-2xl" />
            <h1>About</h1>
          </div>
          <div className="flex items-center gap-2 text-blue-400 hover:text-blue-500 cursor-pointer hover:text-xl transition-all">
            <FaServicestack className="text-2xl" />
            <h1>Services</h1>
          </div>
          <div className="flex items-center gap-2 text-blue-400 hover:text-blue-500 cursor-pointer hover:text-xl transition-all">
            <FaQuestionCircle className="text-2xl" />
            <h1>FAQ</h1>
          </div>
          <div className="flex items-center gap-2 text-blue-400 hover:text-blue-500 cursor-pointer hover:text-xl transition-all">
            <FaPhoneAlt className="text-2xl" />
            <h1>Contact</h1>
          </div>
          <div className="flex gap-2 items-center text-blue-400 hover:text-blue-500 cursor-pointer">
            <FaRegUserCircle className="text-2xl" />
            <h1 className="hidden sm:block">Login/Signup</h1>
          </div>
        </div>
      </nav>
    </div>
  );
}
