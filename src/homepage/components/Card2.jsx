import React from "react";
import card2icon from "../assets/card2icon.png";
import card2img from "../assets/card2img.webp";

const Card2 = () => {
  return (
    <div className="flex mt-12 p-10 gap-12 bg-gradient-to-br from-[#fef7ee] to-[#fdf0e385] min-h-[50vh] items-center justify-center max-w-7xl mx-auto shadow-lg rounded-2xl">
      {/* Left Section */}
      <div className="flex-1 max-w-md">
        <div className="mb-6">
          <span className="flex items-center bg-white text-gray-600 text-sm px-3 py-1 rounded-xl font-medium gap-2">
            <img src={card2icon} alt="icon" width={16} />
            Drive Deeper Connection
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4 leading-snug">
          Improving Engagement with Metrics Analysis
        </h1>

        <p className="text-gray-600 leading-relaxed text-lg mb-6">
          Enhance your social media performance with detailed metrics on likes,
          shares, and interactions. Describe which content resonates most with
          your audience and create more meaningful engagement.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex-1">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <img
            src={card2img}
            alt="Analytics graph showing growth trend"
            className="w-full h-auto object-contain rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Card2;
