import React from 'react'
import "../Styles/Benifit.css"

const Benifits = () => {
  return (
    <section className="features-section">
    <div className="features-header">
      <div className="features-label">
        <span className="icon lock-icon"></span>
        <span>Our Features</span>
      </div>
      <h2>Get more value from your tools</h2>
      <p>
        Connect your tools, connect your teams. With over 100 apps already available in our directory, your team's
        favourite tools are just a click away.
      </p>
    </div>

    <div className="features-grid">
      <div className="feature-card">
        <span className="icon lock-icon"></span>
        <h3>Monetization Tools</h3>
        <p>
          Increase your earning potential. Track ad performance, manage campaigns, and make data-driven decisions to
          improve your ROI.
        </p>
      </div>

      <div className="feature-card">
        <span className="icon grid-icon"></span>
        <h3>User-Friendly Dashboard</h3>
        <p>
          All your data in one place. With TrendTise's intuitive interface, view all key metrics in an organized and
          visually clear dashboard for easy analysis.
        </p>
      </div>

      <div className="feature-card">
        <span className="icon chart-icon"></span>
        <h3>Real-Time Insights</h3>
        <p>
          Stay up to date with your social media performance. We provide instant analytics, helping you react quickly
          to changes in your audience and engagement.
        </p>
      </div>

      <div className="feature-card">
        <span className="icon users-icon"></span>
        <h3>Audience Deep Dive</h3>
        <p>
          Understand your followers on a deeper level. Access detailed demographic and behavioral data to refine your
          targeting and content strategy.
        </p>
      </div>
    </div>
  </section>
  )
}

export default Benifits