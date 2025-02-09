import React from "react";
import photo1 from "../assets/profile_1.jpg";
import photo2 from "../assets/profile_2.jpg";
import photo3 from "../assets/profile_img4.png";

const Info = () => {
  return (
    <div className="max-w-4xl mx-auto my-10 text-gray-800 flex">
      <p className="text-3xl">
        Whether you are aiming to grow your{" "}
        <span className="inline-flex items-center mt-4 space-x-2">
          <span className="relative">
            <img src={photo1} alt="Profile 1" className="w-7 h-7 rounded-full border-2 border-white -ml-2" />
          </span>
          <span className="relative">
            <img src={photo2} alt="Profile 2" className="w-7 h-7 rounded-full border-2 border-white -ml-2" />
          </span>
          <span className="relative">
            <img src={photo3} alt="Profile 3" className="w-7 h-7 rounded-full border-2 border-white -ml-2" />
          </span>
        </span>{" "}
        audience, identify new opportunities, or improve engagement, our
        dashboard delivers actionable metrics that help you refine your
        strategy and achieve lasting success.
      </p>
    </div>
  );
};

export default Info;
