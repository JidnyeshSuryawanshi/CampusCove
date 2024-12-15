import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <div>
      <nav className="bg-blue-400 w-[100%] h-16 flex items-center gap-3">
        <div className="w-full h-16 flex  items-center gap-2">
          <img
            className="w-auto h-[70%] align-middle rounded-[50%]"
            src="/New_Logo.PNG"
            alt="My_Logo"
          />
          <h1 className="font-Nutino text-[#FFFECB] font-bold text-3xl">
            Campus<span className="text-[#F5EFFF]">Cove</span>
          </h1>
        </div>
        <div className="flex gap-8 text-slate-50 text-1xl font-Nutino">
          <h1 className="hover:text-[#FFFECB] cursor-pointer hover:text-lg">Home</h1>
          <h1 className="hover:text-[#FFFECB] cursor-pointer hover:text-lg">About</h1>
          <h1 className="hover:text-[#FFFECB] cursor-pointer hover:text-lg">Services</h1>
          <h1 className="hover:text-[#FFFECB] cursor-pointer hover:text-lg">FAQ</h1>
          <h1 className="hover:text-[#FFFECB] cursor-pointer hover:text-lg">Contact</h1>
          <div className="flex gap-1 items-center hover:text-[#FFFECB]">
            <FaRegUserCircle />
            <h1>Login/Signup</h1>
          </div>
        </div>
      </nav>
    </div>
  );
}
