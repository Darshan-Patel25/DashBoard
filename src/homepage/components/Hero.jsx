import React from "react";
import facebookIcon from "../assets/icon_faceboob.webp";
import twitterIcon from "../assets/icon_x.png";
import instagramIcon from "../assets/icon_insta.webp";
import linkedinIcon from "../assets/icon_linkedin.png";
import dashboardImage from "../assets/cvmui.jpeg"
const Hero = () => {
  const iconMap = {
    facebook: facebookIcon,
    twitter: twitterIcon,
    instagram: instagramIcon,
    linkedin: linkedinIcon,
  };

  return (
    <section className="relative py-8 text-center overflow-hidden  font-serif">
      {/* Content */}
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-md mb-6">
          <span className="text-sm text-blue-600">⚡ Instant Report</span>
        </div>
        <h1 className="text-4xl md:text-[2.7rem] font-bold text-gray-900 leading-tight mb-6">
          Track, Analyze, and Grow Your <br /> Social Media with Ease
        </h1>
        <p className="text-lg text-gray-700 mb-10 leading-relaxed">
          Get real-time insights on audience growth, follower <br /> trends, and
          potential clients, all in one place.
        </p>
        {/* <button className="bg-indigo-600 text-white py-3 px-6 rounded-md font-medium text-lg transition-all hover:bg-indigo-500">
          Start your free trial
        </button> */}
      </div>

      {/* Dashboard Image */}
      <div className="mt-12">
        <img
          src={dashboardImage}
          alt="TrendTide Dashboard"
          className="max-w-[55%] mx-auto rounded-lg shadow-xl"
        />
      </div>

      {/* Social Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {Object.keys(iconMap).map((platform) => (
          <div
            key={platform}
            className={`absolute w-12 h-12 bg-white rounded-lg shadow-lg p-0 ${
              platform === "facebook"
                ? "top-[20%] left-[10%]"
                : platform === "twitter"
                ? "top-[15%] right-[15%]"
                : platform === "instagram"
                ? "bottom-[30%] left-[15%]"
                : platform === "linkedin"
                ? "bottom-[25%] right-[10%]"
                : ""
            }`}
          >
            <img
              src={iconMap[platform]}
              alt={`${platform} icon`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
