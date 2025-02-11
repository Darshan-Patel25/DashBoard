import React from "react";
import graph from "../assets/graph.webp"
function Card1() {
  return (
    <div className="flex p-10 gap-12 bg-gradient-to-tr from-blue-100 to-gray-50 min-h-[50vh] items-center justify-center max-w-7xl mx-auto shadow-lg rounded-2xl">
      {/* Left Section */}
      <div className="flex-1 max-w-md">
        <div className="mb-6">
          <span className="flex items-center gap-2 text-gray-500 text-sm bg-white px-3 py-1 rounded-md font-medium">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-gray-400"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Know your followers better
          </span>
        </div>

        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Audience Growth & Analysis
        </h1>
        <p className="text-gray-600 leading-relaxed mb-6 text-lg">
          Track your audience growth in real-time and analyze demographics,
          behaviors, and interests. Understand who your followers are and
          optimize your content to boost engagement and reach.
        </p>

        {/* <button className="bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-600">
          Book a demo
        </button> */}
      </div>

      {/* Right Section */}
      <div className="flex-1">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl text-gray-800">Audience Growth</h2>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Today</span>
              <span>This Week</span>
          
            </div>
          </div>
          <div className="relative w-full">
            <img
              src={graph}
              alt="Analytics graph showing growth trend"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card1;
