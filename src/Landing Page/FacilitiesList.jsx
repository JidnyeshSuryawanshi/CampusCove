import React from "react";

export default function FacilitiesList() {
  return (
    <div className="w-full relative">
      <img
        className="h-[90.1vh] w-full object-cover"
        src="/Landing_Page_bg_1.jfif"
        alt="Background"
      />
      <div className="absolute left-0 top-0 text-white text-center w-[50%]">
        <h1 className="uppercase text-start ml-12 mt-16 mb-10 leading-relaxed ">
          <span className="text-3xl">Welcome to CampusCove</span>
          <br /> Your One-Stop Platform for Mess & Hostel Services
        </h1>

        <div className="grid grid-cols-2 gap-6 text-start ml-12">
          <div>
            <h1 className="text-2xl">Hostel Room Bookings</h1>
            <p>
              Finding the right hostel is made easy with CampusCove. Our
              platform helps you find best hostel for you.
            </p>
          </div>
          <div>
            <h1 className="text-2xl">Easy Mess Bookings</h1>
            <p>
              With CampusCove, you can easily book your mess services for the
              month. No more confusion about meal plans
            </p>
          </div>
          <div>
            <h1 className="text-2xl">Local Shops & Services</h1>
            <p>
              CampusCove also helps you discover local services like breakfast
              shops, gyms, and temples in your college vicinity.
            </p>
          </div>
          <div>
            <h1 className="text-2xl">Reviews and Ratings</h1>
            <p>
              CampusCove empowers students by providing reviews and ratings of
              messes, hostels, and local services.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-[17%] flex gap-5">
        <button className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 ">
          Sign Up
        </button>
        <button className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 ">
          About Us
        </button>
      </div>
    </div>
  );
}
