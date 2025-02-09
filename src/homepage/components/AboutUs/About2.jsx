import React from 'react';
import darshanImg from '../../assets/darshan_img.jpeg';
import vandanImg from '../../assets/rvimg.jpeg';
import mananImg from '../../assets/mnimg.jpeg';
import rajImg from '../../assets/raj_img.jpeg';
import mdImg from '../../assets/md_img.jpg';

const teamMembers = [
  { name: "Darshan Patel", jobTitle: "Backend Developer", image: darshanImg },
  { name: "Vandan Rangani", jobTitle: "Fullstack Developer", image: vandanImg },
  { name: "Manan Kakadia", jobTitle: "Frontend Developer", image: mananImg },
  { name: "Raj Ukani", jobTitle: "AI/ML Expert", image: rajImg },
];

const About3 = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 font-serif">
      {/* Header Section */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold">
          <span className="block text-black">PROJECT</span>
          <span className="block text-blue-600">CASE STUDY</span>
        </h1>
      </header>

      {/* Featured Member */}
      <div className="featured-member mb-10">
        <div className="featured-image-wrapper">
          <img
            src={mdImg}
            alt="Prof. Mittal Darji"
            className="rounded-lg w-48 h-48 object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold mt-4">Prof. Mittal Darji</h2>
        <p className="text-gray-600 mt-2">
          Teaching UG/PG Courses in Information Technology, Guiding UG and PG projects, Departmental co-ordinator of various committees.
        </p>
      </div>

      {/* Team Members Section */}
      <div className="grid grid-cols-2 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member text-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-40 h-40 rounded-lg mx-auto object-cover"
            />
            <h3 className="text-lg font-bold mt-4">{member.name}</h3>
            <p className="text-gray-500">{member.jobTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About3;
