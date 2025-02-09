import React from 'react';
import CVMImage from "../../assets/cvm_img1.jpg";
import PresidentPhoto from "../../assets/president_photo.jpg";
import "../../Styles/AboutUsCSS/About1.css";

const About1 = () => {
  return (
    <div className="brochure-container">
      {/* About Company Section */}
      <section className="brochure-page about-section">
        <div className="content-wrapper">
          <h1 className="heading">
            <span className="heading-dark">ABOUT</span>
            <span className="heading-blue">CVMU HACKATHON 3.0</span>
          </h1>

          <div className="about-content">
            <p className="about-intro">
              CVMU Hackathon is an opportunity to attempt to solve some of the most serious issues we face on a daily basis, instilling a culture of product creation and a problem-solving approach in students.
            </p>
            <p className="about-description">
              CVMUISC has planned various activities to enable the young generation to achieve their creative potential through start-up and innovation in order to enable them to contribute to sustainable development and equitable growth towards the attainment of Aatmanirbhar Bharat. CVMU Hackathon is one such event where youth will actively participate, design, develop and demonstrate their innovative skills.
            </p>
          </div>

          <div className="image-container">
            <img
              src={CVMImage}
              alt="Modern architecture building"
              className="building-image"
            />
          </div>
        </div>
      </section>

      {/* CEO Statement Section */}
      <section className="brochure-page ceo-section">
        <div className="content-wrapper">
          <h1 className="heading">
            <span className="heading-dark">PRESIDENT</span>
            <span className="heading-blue">STATEMENT</span>
          </h1>

          <div className="ceo-content">
            <div className="ceo-info">
              <h2 className="ceo-name">Shri Bhikhubhai B. Patel</h2>
              <p className="ceo-intro">
                Founded for rural resurgence in 1945, this Oxbridge of India caters to 30,000 students and is managed by Charutar Vidya Mandal (CVM).
              </p>
            </div>

            <div className="ceo-image-container">
              <div className="image-frame"></div>
              <img src={PresidentPhoto} alt="CEO portrait" className="ceo-image" />
            </div>

            <div className="quote-section">
              <div className="quote-mark">"</div>
              <p className="quote-text">
                After nurturing 1 million minds, planting two educational towns (Vallabh Vidyanagar, New Vallabh Vidyanagar), one industrial town Vithal Udyognagar and Arogya Nagar the CVM trust in its platinum jubilee year founded The Charutar Vidya Mandal University in 2019 that was inaugurated by Shri M Venkaiah Naidu, the Vice President of India.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About1;
