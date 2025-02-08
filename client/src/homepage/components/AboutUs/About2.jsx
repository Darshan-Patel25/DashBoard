import React from 'react'
import "../../Styles/AboutUsCSS/About2.css"
const About2 = () => {
    const teamMembers = [
        {
          name: "Darshan Patel",
          jobTitle: "Backend Developer",
          image:
            "src/assets/darshan_img.jpeg",
        },
        {
          name: "Vandan Rangani",
          jobTitle: "Fullstack Developer",
          image:
            "src/assets/rvimg.jpeg",
        },
        {
          name: "Manan Kakadia",
          jobTitle: "Frontend Developer",
          image:
            "src/assets/mnimg.jpeg",
        },
        {
          name: "Raj Ukani",
          jobTitle: "AI/ML expert",
          image:
            "src/assets/raj_img.jpeg",
        }
        
      ]
    
      return (
        <div className="brochure-spread">
          <div className="page left-page">
            <h1 className="creative-team-title">
              <span>CREATIVE</span>
              <span className="highlight">TEAM</span>
            </h1>
            <div className="featured-member">
              <div className="featured-image-wrapper">
                <img
                  src="src/assets/md_img.jpg"
                  alt="James Smith"
                  className="featured-image"
                />
              </div>
              <h2 className="featured-name">Prof. Mittal Darji</h2>
              <p className="featured-bio">
              Teaching UG/PG Courses in Information Technology, Guiding UG and PG projects, Departmental co-ordinator of various committees
              </p>
            </div>
            <div className="quote-box">
              <span className="quote-mark">"</span>
              <p className="quote-text">The moment you think of giving up, Think of the reason why you held on so long.</p>
            </div>
          </div>
          <div className="page right-page">
          
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-member">
                  <img src={member.image || "/placeholder.svg"} alt={member.name} className="member-image" />
                  <div className={`member-info ${index % 2 === 0 ? "blue" : "dark"}`}>
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-job">{member.jobTitle}</p>
                  </div>
                  {/* <div className="member-details">
                    <p>Hampden thes Sydney</p>
                    <p>College in the Virginia</p>
                    <p>looked dolor amet</p>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
}

export default About2