import React from 'react'
import "../Styles/Card1.css"

const Card2 = () => {
  return (
    <div className="container" style={{background:"linear-gradient(135deg, #fef7ee, #fdf0e385)"}}>
    <div className="left-section">
      <div className="header">
        <span className="small-text">
          <img src="src/assets/card2icon.png" alt="" width={16}/>
          Drive Deeper Connection
        </span>
      </div>

      <h1>Improving Engagement with Metrics Analysis</h1>
      <p className="description">
       Enhance your social media performance with detailed metrics on likes, shares and interactions.
       Describe which content resonates most with your audience and create more meaningful engagement. 
      </p>

      {/* <button className="demo-button">Book a demo</button> */}
    </div>

    <div className="right-section">
      <div className="graph-card">
        {/* <div className="graph-header"> */}
          {/* <h2>Audience Growth</h2> */}
          {/* <div className="controls"> */}
            {/* <span>Today</span> */}
            {/* <span>This Week</span> */}
            {/* <button className="live-button">Live Now</button> */}
          {/* </div> */}
        {/* </div> */}
        <div className="graph">
          <img
          
            src="src/assets/card2img.webp"
            alt="Analytics graph showing growth trend"
            className="graph-image"
          />
        </div>
      </div>
    </div>
  </div>
  )
}

export default Card2


