import React, { useState } from 'react';

const FAQ = () => {
  
  const [activeIndex, setActiveIndex] = useState(null);

  
  const toggleAnswer = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);  
    } else {
      setActiveIndex(index); 
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center py-12">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-3xl w-full">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">Frequently Asked Questions(FAQ)</h1>

        <div className="space-y-4">
          {}
          <div className="border-b-2 shadow border-blue-300">
        <div
            onClick={() => toggleAnswer(0)}
            className={`cursor-pointer p-4 rounded-md ${activeIndex === 0 ? 'bg-blue-100' : 'bg-gray-50'} transition-all`}
        >
            <h2 className="text-lg font-semibold text-gray-700">How do I book a hostel room?</h2>
        </div>

        {activeIndex === 0 && (
            <div
            className="bg-gray-50 p-4 shadow-2xl rounded-md mt-2 transition-all duration-500 ease-in-out transform opacity-100 max-h-[400px] overflow-hidden"
            >
            <p className="text-gray-700">
                To book a hostel room, choose a location, and select the room number with availability of rooms.
            </p>
            </div>
        )}
        </div>



          {}
          <div className="border-b-2 border-blue-300">
            <div
              onClick={() => toggleAnswer(1)}
              className={`cursor-pointer p-4 rounded-md ${activeIndex === 1 ? 'bg-blue-100' : 'bg-gray-50'} transition-all`}
            >
              <h2 className="text-lg font-semibold text-gray-700">What is included in the booking?</h2>
            </div>
            {activeIndex === 1 && (
              <div className="bg-gray-50 p-4 shadow-2xl rounded-md mt-2">
                <p className="text-gray-700">Our hostel booking includes a bed,free Wi-Fi, heater and access to common areas. Meals can be added on request.</p>
              </div>
            )}
          </div>


          {}
          <div className="border-b-2 border-blue-300">
            <div
              onClick={() => toggleAnswer(2)}
              className={`cursor-pointer p-4 rounded-md ${activeIndex === 2 ? 'bg-blue-100' : 'bg-gray-50'} transition-all`}
            >
              <h2 className="text-lg font-semibold text-gray-700">Can I cancel or change my booking?</h2>
            </div>
            {activeIndex === 2 && (
              <div className="bg-gray-50 p-4 shadow-2xl rounded-md mt-2">
                <p className="text-gray-700">Yes, you can cancel or modify your booking up to 24 hours before the scheduled check-in time without a charge.</p>
              </div>
            )}
          </div>


          {}
          <div className="border-b-2 border-blue-300">
            <div
              onClick={() => toggleAnswer(3)}
              className={`cursor-pointer p-4 rounded-md ${activeIndex === 3 ? 'bg-blue-100' : 'bg-gray-50'} transition-all`}
            >
              <h2 className="text-lg font-semibold text-gray-700">Is food available at the hostel?</h2>
            </div>
            {activeIndex === 3 && (
              <div className="bg-gray-50 p-4 shadow-2xl rounded-md mt-2">
                <p className="text-gray-700">Yes, we provide meal options in our hostel as well as seperate food services at the mess. You can book your meals along with your hostel or book them separately.</p>
              </div>
            )}
          </div>

          <div className="border-b-2 border-blue-300">
            <div
              onClick={() => toggleAnswer(4)}
              className={`cursor-pointer p-4 rounded-md ${activeIndex === 4 ? 'bg-blue-100' : 'bg-gray-50'} transition-all`}
            >
              <h2 className="text-lg font-semibold text-gray-700">What is included in the booking?</h2>
            </div>
            {activeIndex === 4 && (
              <div className="bg-gray-50 p-4 shadow-2xl rounded-md mt-2">
                <p className="text-gray-700">Our hostel booking includes a bed, free Wi-Fi, and access to common areas. Meals can be added on request.</p>
              </div>
            )}
          </div>

          <div className="border-b-2 border-blue-300">
            <div
              onClick={() => toggleAnswer(5)}
              className={`cursor-pointer p-4 rounded-md ${activeIndex === 5 ? 'bg-blue-100' : 'bg-gray-50'} transition-all`}
            >
              <h2 className="text-lg font-semibold text-gray-700">What are the hostel’s security measures</h2>
            </div>
            {activeIndex === 5 && (
              <div className="bg-gray-50 p-4 shadow-2xl rounded-md mt-2">
                <p className="text-gray-700"> Our hostels take security very seriously and provide 24/7 security, CCTV cameras, and electronic access to rooms for added safety. You can also use lockers for personal belongings</p>
              </div>
            )}
          </div>

          <div className="border-b-2 border-blue-300">
            <div
              onClick={() => toggleAnswer(6)}
              className={`cursor-pointer p-4 rounded-md ${activeIndex === 6 ? 'bg-blue-100' : 'bg-gray-50'} transition-all`}
            >
              <h2 className="text-lg font-semibold text-gray-700">How do I make payment for my booking?</h2>
            </div>
            {activeIndex === 6 && (
              <div className="bg-gray-50 p-4 shadow-2xl rounded-md mt-2">
                <p className="text-gray-700">We accept payments through credit cards, debit cards, and various online payment platforms such as Gpay. You can pay during the booking process on our website.</p>
              </div>
            )}
          </div>

          <div className="border-b-2 border-blue-300">
            <div
              onClick={() => toggleAnswer(7)}
              className={`cursor-pointer p-4 rounded-md ${activeIndex === 7 ? 'bg-blue-100' : 'bg-gray-50'} transition-all`}
            >
              <h2 className="text-lg font-semibold text-gray-700">Can I bring my own food to the hostel?</h2>
            </div>
            {activeIndex === 7 && (
              <div className="bg-gray-50 p-4 shadow-2xl rounded-md mt-2">
                <p className="text-gray-700">Guests are allowed to bring their own food to the hostel, but we request that you consume it in designated areas (such as the common kitchen or dining room).</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FAQ;
