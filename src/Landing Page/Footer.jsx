import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-white">
              About CampusCove
            </h2>
            <p className="mt-4 text-sm">
              CampusCove is your one-stop solution for simplifying student life.
              From booking hostels to discovering local services, we make your
              campus experience hassle-free and enjoyable.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">Quick Links</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#hostel" className="hover:text-green-400 transition">
                  Hostel Finder
                </a>
              </li>
              <li>
                <a href="#mess" className="hover:text-green-400 transition">
                  Mess Booking
                </a>
              </li>
              <li>
                <a
                  href="#local-shops"
                  className="hover:text-green-400 transition"
                >
                  Local Shops
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-green-400 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">Contact Us</h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <span className="font-medium">Email:</span>{" "}
                jidnyesh0149@gmail.cim
              </li>
              <li>
                <span className="font-medium">Phone:</span> +1 123 456 7890
              </li>
              <li>
                <span className="font-medium">Address:</span> MIT Academy of
                Engineering, Alandi
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8"></div>

        <div className="flex flex-col md:flex-row items-center justify-between mt-6">
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-400 hover:text-green-400 transition text-2xl"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-green-400 transition text-2xl"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-green-400 transition text-2xl"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-green-400 transition text-2xl"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          <p className="text-sm mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} CampusCove. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
