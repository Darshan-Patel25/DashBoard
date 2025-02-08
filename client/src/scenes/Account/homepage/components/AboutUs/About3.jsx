import React from 'react'
import "../../Styles/AboutUsCSS/About3.css"

const About3 = () => {
  return (
    
    <div className="case-study">
    <header className="header">
      <h1>
        <span className="project-text">PROJECT</span>
        <span className="case-study-text">CASE STUDY</span>
      </h1>
    </header>

    <div className="main-content">
      <div className="intro-section">
        <h2 className="main-title">
        Turning Data into Decisions: Why We Chose This Challenge!
        </h2>
        <p className="intro-text">
        Social media has evolved beyond just connecting people—it’s now a driving force behind influence, brand growth, and business success. But with millions of interactions happening every second, making sense of the data isn’t easy. Businesses, creators, and marketers often struggle to extract meaningful insights from the endless stream of engagement metrics, trends, and audience sentiments.
        </p>
      </div>

      <div className="sections-container">
        <div className="project-overview">
          <h3>Project Overview</h3>
          <p>
          Social media is a powerful tool, but understanding its data can be overwhelming. Our dashboard simplifies this by providing real-time engagement tracking, 
          sentiment analysis, trend identification, and competitor insights—all in one place.
          </p>
          <p>
          With automated post scheduling, deep analytics, and a Telegram bot for instant updates, we turn raw data into actionable insights.
           Our goal is to help businesses, creators, and marketers make smarter, data-driven decisions effortlessly.
          </p>
        </div>

        <div className="right-sections">
          <div className="challenge-section">
            
            <h3>Challenge</h3>
            <p>
            Social media analytics is a maze—vast amounts of data, scattered metrics, and unclear insights make it difficult for users to make informed decisions. 
            Navigating this complexity often leaves businesses and creators struggling to stay relevant and competitive in a rapidly changing digital world.
            </p>
          </div>

          <div className="solution-section">
            <h3>Project Solution</h3>
            <p>
            Our AI-powered social media analytics dashboard provides a simple yet powerful solution for tracking real-time engagement, understanding audience sentiment, identifying trends, and analyzing competitors—all in one place. 
            With automated post scheduling, in-depth analytics, and a Telegram bot for instant updates, we turn complex data into clear, actionable insights,
             helping users make smarter decisions and stay ahead in today’s fast-paced digital world.
            </p>
          </div>

          {/* <div className="image-container">
            <img
              src="src/assets/cvmui.jpeg"
              alt="Business meeting"
              className="case-study-image"
            />
          </div> */}
        </div>
      </div>
    </div>
  </div>
  );
};



    
  

export default About3