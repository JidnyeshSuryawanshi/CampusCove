import React from "react";

export default function MovingSlogan() {
  return (
    <div className="bg-blue-100 py-6 overflow-hidden">
      {/* Scrolling container */}
      <div className="flex animate-scroll gap-8 whitespace-nowrap">
        {/* Duplicate content for seamless scrolling */}
        <div className="flex gap-8">
          <h1 className="text-3xl font-semibold text-blue-700">
            Your Campus, Your Choices, Your Convenience!
          </h1>
          <h1 className="text-3xl font-semibold text-blue-700">
            Empowering Students, Simplifying Campus Life!
          </h1>
          <h1 className="text-3xl font-semibold text-blue-700">
            Hassle-Free Living Starts Here!
          </h1>
        </div>
        {/* Duplicate content to enable seamless looping */}
        <div className="flex gap-8">
          <h1 className="text-3xl font-semibold text-blue-700">
            Your Campus, Your Choices, Your Convenience!
          </h1>
          <h1 className="text-3xl font-semibold text-blue-700">
            Empowering Students, Simplifying Campus Life!
          </h1>
          <h1 className="text-3xl font-semibold text-blue-700">
            Hassle-Free Living Starts Here!
          </h1>
        </div>
        <div className="flex gap-8">
          <h1 className="text-3xl font-semibold text-blue-700">
            Your Campus, Your Choices, Your Convenience!
          </h1>
          <h1 className="text-3xl font-semibold text-blue-700">
            Empowering Students, Simplifying Campus Life!
          </h1>
          <h1 className="text-3xl font-semibold text-blue-700">
            Hassle-Free Living Starts Here!
          </h1>
        </div>
        <div className="flex gap-8">
          <h1 className="text-3xl font-semibold text-blue-700">
            Your Campus, Your Choices, Your Convenience!
          </h1>
          <h1 className="text-3xl font-semibold text-blue-700">
            Empowering Students, Simplifying Campus Life!
          </h1>
          <h1 className="text-3xl font-semibold text-blue-700">
            Hassle-Free Living Starts Here!
          </h1>
        </div>
      </div>
    </div>
  );
}
