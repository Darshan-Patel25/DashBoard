import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import facebookIcon from "../assets/icon_faceboob.webp";
import twitterIcon from "../assets/icon_x.png";
import instagramIcon from "../assets/icon_insta.webp";
import linkedinIcon from "../assets/icon_linkedin.png";
import dashboardImage from "../assets/cvmui.jpeg";

const Hero = () => {
  const iconRefs = useRef([]);





  return (
    <section className="relative text-center py-10 overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-snug">
          Track, Analyze, and Grow Your<br /> Social Media with Ease
        </h1>
        <p className="text-lg text-gray-700 mb-10">
          Get real-time insights on audience growth and follower trends, all in one place.
        </p>

        <img
          src={dashboardImage}
          alt="TrendTide Dashboard"
          className="max-w-[55%] mx-auto rounded-2xl shadow-lg"
        />
      </div>

    </section>
  );
};

export default Hero;
