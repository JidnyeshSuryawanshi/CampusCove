import React, { useState } from "react";
import {
  FaHome,
  FaInfoCircle,
  FaQuestionCircle,
  FaPhoneAlt,
  FaRegUserCircle,
  FaBars,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  let col = "";

  if (path === "/about" || path === "/faq" || path === "/contact")
    col = "bg-blue-50";
  else if (path === "/login" || path === "/register") col = "bg-green-50";
  else col = "bg-white";
  return (
    <div>
      <nav
        className={`${col} w-full h-13 flex items-center justify-between px-6`}
      >
        <div className="flex items-center gap-3">
          <Link to={"/"}>
            <img
              className="w-12 h-12 rounded-full object-cover"
              src="/New_Logo.PNG"
              alt="My_Logo"
            />
          </Link>
          <h1 className="font-Nutino text-blue-400 font-bold text-2xl md:text-3xl">
            Campus<span className="text-blue-300">Cove</span>
          </h1>
        </div>

        <div className="hidden md:flex gap-6 items-center text-slate-50 text-lg font-Nutino">
          <div className="flex items-center gap-2 text-blue-400 hover:text-blue-500 cursor-pointer hover:text-xl transition-all">
            <FaHome className="text-2xl" />
            <Link to={"/"}>Home</Link>
          </div>
          <div className="flex items-center gap-2 text-blue-400 hover:text-blue-500 cursor-pointer hover:text-xl transition-all">
            <FaInfoCircle className="text-2xl" />
            <Link to={"/about"}>About</Link>
          </div>
          <div className="flex items-center gap-2 text-blue-400 hover:text-blue-500 cursor-pointer hover:text-xl transition-all">
            <FaQuestionCircle className="text-2xl" />
            <Link to={"/faq"}>FAQs</Link>
          </div>
          <div className="flex items-center gap-2 text-blue-400 hover:text-blue-500 cursor-pointer hover:text-xl transition-all">
            <FaPhoneAlt className="text-2xl" />
            <Link to={"/contact"}>Contact</Link>
          </div>
          <div className="flex gap-2 items-center text-blue-400 hover:text-blue-500 cursor-pointer">
            <FaRegUserCircle className="text-2xl" />
            <Link to={"/login"}>Login/Signup</Link>
          </div>
        </div>

        <div className="flex md:hidden items-center text-blue-400">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="focus:outline-none"
          >
            <FaBars className="text-3xl" />
          </button>
        </div>
      </nav>

      {isDropdownOpen && (
        <div className="bg-blue-100 w-full text-lg font-Nutino md:hidden">
          <Link
            to={"/"}
            className="flex items-center gap-2 p-3 text-blue-400 hover:bg-blue-200"
            onClick={() => setIsDropdownOpen(false)}
          >
            <FaHome className="text-xl" />
            Home
          </Link>
          <Link
            to={"/about"}
            className="flex items-center gap-2 p-3 text-blue-400 hover:bg-blue-200"
            onClick={() => setIsDropdownOpen(false)}
          >
            <FaInfoCircle className="text-xl" />
            About
          </Link>
          <Link
            to={"/faq"}
            className="flex items-center gap-2 p-3 text-blue-400 hover:bg-blue-200"
            onClick={() => setIsDropdownOpen(false)}
          >
            <FaQuestionCircle className="text-xl" />
            FAQs
          </Link>
          <Link
            to={"/contact"}
            className="flex items-center gap-2 p-3 text-blue-400 hover:bg-blue-200"
            onClick={() => setIsDropdownOpen(false)}
          >
            <FaPhoneAlt className="text-xl" />
            Contact
          </Link>
          <Link
            to={"/login"}
            className="flex items-center gap-2 p-3 text-blue-400 hover:bg-blue-200"
            onClick={() => setIsDropdownOpen(false)}
          >
            <FaRegUserCircle className="text-xl" />
            Login/Signup
          </Link>
        </div>
      )}
    </div>
  );
}
