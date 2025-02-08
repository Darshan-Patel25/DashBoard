import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import "../Styles/Hero.css";
import facebookIcon from "../assets/icon_faceboob.webp";
import twitterIcon from "../assets/icon_x.png";
import instagramIcon from "../assets/icon_insta.webp";
import linkedinIcon from "../assets/icon_linkedin.png";

const Hero = () => {
  const iconRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      iconRefs.current,
      {
        x: (i) => (i % 2 === 0 ? -100 : 100), // Even index icons come from the left, odd from the right
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  const iconMap = {
    facebook: facebookIcon,
    twitter: twitterIcon,
    instagram: instagramIcon,
    linkedin: linkedinIcon,
  };

  return (
    <>
      <section className="hero">
        <div className="content">
          <div className="badge">
            <span>⚡ Instant Report</span>
          </div>
          <h1 className="title">
            Track, Analyze, and Grow Your
            <br />
            Social Media with Ease
          </h1>
          <p className="subtitle">
            Get real-time insights on audience growth, follower
            <br />
            trends, and potential clients, all in one place
          </p>
        </div>
        <div className="dashboard">
          <img
            src="src/assets/cvmui.jpeg"
            alt="TrendTide Dashboard"
            className="dashboard-image"
          />
        </div>
        <div className="social-icons">
          {Object.keys(iconMap).map((platform, index) => (
            <div
              key={platform}
              className={`social-icon ${platform}`}
              ref={(el) => (iconRefs.current[index] = el)}
            >
              <img
                src={iconMap[platform]}
                alt={`${platform} icon`}
                className="icon-image"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Hero;