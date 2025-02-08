import React from "react"
import "../Styles/Card1.css"

function Card1() {
  return (
    <div className="container">
      <div className="left-section">
        <div className="header">
          <span className="small-text">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="icon">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Know your followers better
          </span>
        </div>

        <h1>Audience Growth & Analysis</h1>
        <p className="description">
          Track your audience growth in real-time and analyze demographics, behaviors, and interests. Understand who
          your followers are and optimize your content to boost engagement and reach.
        </p>

        {/* <button className="demo-button">Book a demo</button> */}
      </div>

      <div className="right-section">
        <div className="graph-card">
          <div className="graph-header">
            <h2>Audience Growth</h2>
            <div className="controls">
              <span>Today</span>
              <span>This Week</span>
              <button className="live-button">Live Now</button>
            </div>
          </div>
          <div className="graph">
            <img
              src="src/assets/graph.webp"
              alt="Analytics graph showing growth trend"
              className="graph-image"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card1

