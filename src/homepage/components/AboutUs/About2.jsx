import React from 'react';
import darshanImg from '../../assets/darshan_img.jpeg';
import vandanImg from '../../assets/rvimg.jpeg';
import mananImg from '../../assets/mnimg.jpeg';
import rajImg from '../../assets/raj_img.jpeg';
import mdImg from '../../assets/md_img.jpg';
import "../../Styles/AboutUsCSS/About2.css"

const teamMembers = [
  { name: "Darshan Patel", jobTitle: "Backend Developer", image: darshanImg },
  { name: "Vandan Rangani", jobTitle: "Fullstack Developer", image: vandanImg },
  { name: "Manan Kakadia", jobTitle: "Frontend Developer", image: mananImg },
  { name: "Raj Ukani", jobTitle: "AI/ML Expert", image: rajImg },
];

const About2 = () => {
  return (
    <div className="flex flex-col md:flex-row mt-16 ">
    {/* Left Page */}
    <div className="flex-1 p-6 font-serif">
      <h1 className="text-5xl font-bold mb-16 ml-8">
        <span>CREATIVE </span>
        <span className="text-[#3C5BBF] ml-1">TEAM</span>
      </h1>

      {/* Featured Member */}
      <div className="mb-8">
        <div className="relative mb-5 ml-12">
          <img
            src={mdImg}
            alt="Prof. Mittal Darji"
            className="w-1/2 rounded-bl-[80px]"
          />
          <div className="absolute bottom-0 left-0 right-0 h-[30%] rounded-bl-[80px]"></div>
        </div>
        <h2 className="text-2xl font-semibold">Prof. Mittal Darji</h2>
        <p className="text-gray-600">
          Teaching UG/PG Courses in Information Technology, Guiding UG and PG
          projects, Departmental coordinator of various committees.
        </p>
      </div>

      {/* Quote Box */}
      <div className="bg-gradient-to-br from-[#e3eeffb9] to-[#f5f9ff9d] text-gray-700 p-6 relative rounded-lg">
        <span className="text-6xl absolute top-5 left-4 opacity-30">"</span>
        <p className="italic pl-7">
          The moment you think of giving up, think of the reason why you held
          on so long.
        </p>
      </div>
    </div>

    {/* Right Page (Team Grid) */}
    <div className="flex-1 p-6 font-serif">
      <div className="grid grid-cols-2 gap-12 w-[500px] mt-16 ml-12">
        {teamMembers.map((member, index) => (
          <div key={index} className="text-center">
            <img
              src={member.image || "/placeholder.svg"}
              alt={member.name}
              className="w-[80%] h-[70%] rounded-2xl ml-5"
            />
            <div
              className={`mt-[-10px] mx-[5px] mb-[10px] p-[10px] rounded-[8px] text-white ${
                index % 2 === 0 ? "bg-[#4e80d1e0]" : "bg-[#3d3a3ddd]"
              }`}
            >
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-sm">{member.jobTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default About2;
