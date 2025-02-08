import React from "react";
import "../Styles/Info.css"

const Info = () => {
  return (
    <>
      <div className="info">
        <p>
          Wheather you are aiming to grow your{" "}
          <span className="main_profile">
          <span className="profile_img">
            <img src="src/assets/profile_1.jpg" alt="img1" />
          </span>
          <span className="profile_img">
            <img src="src/assets/profile_2.jpg" alt="img2" />
          </span>
          <span className="profile_img"><img src="src/assets/profile_img4.png" alt="img3" /></span>
          </span>
          auidience, identify new opportunities, or improve engagement our dashboard delivers actionable metrics that help you refine your strategy and achieve lasting success.
        </p>
      </div>
    </>
  );
};

export default Info;
