import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <div>
      <nav className="bg-[#0073a2] w-[100%] h-16 flex items-center gap-3">
        <div className="w-full h-16 flex  items-center gap-2">
          <img
            className="w-auto h-[70%] align-middle rounded-[50%]"
            src="/New_Logo.PNG"
            alt="My_Logo"
          />
          <h1 className="font-Nutino text-white font-bold text-3xl">
            Campus<span className="text-yellow-300">Cove</span>
          </h1>
        </div>
        <div className="flex gap-8 text-slate-50 text-1xl font-Nutino">
          <h1 className="hover:text-yellow-400 cursor-pointer">Home</h1>
          <h1 className="hover:text-yellow-400 cursor-pointer">About</h1>
          <h1 className="hover:text-yellow-400 cursor-pointer">Services</h1>
          <h1 className="hover:text-yellow-400 cursor-pointer">FAQ</h1>
          <h1 className="hover:text-yellow-400 cursor-pointer">Contact</h1>
          <div className="flex gap-1 items-center hover:text-yellow-300">
            <FaRegUserCircle />
            <h1>Login/Signup</h1>
          </div>
        </div>
      </nav>
    </div>
  );
}
