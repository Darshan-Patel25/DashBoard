import React from 'react'
import "../Styles/Benifit.css"

const Benifits = () => {
  return (
    <section className="features-section">
    <div className="features-header">
      <div className="features-label">
        {/* <span className="icon lock-icon"></span> */}
        <span>Our Features</span>
      </div>
      <h2>Get more value from our tools</h2>
      <p>
        Connect your tools, connect your teams. With over 100 apps already available in our directory, your team's
        favourite tools are just a click away.
      </p>
    </div>

    <div className="features-grid">
      <div className="feature-card">
        <span className="icon lock-icon"></span>
        <h3>Smart Post Scheduler</h3>
        <p>
        Ensures your content goes live at peak engagement times by intelligently queuing and publishing across multiple platforms. It analyzes past data, optimizes scheduling, 
        and keeps your content consistent—so you can focus on creating while it handles the rest!
        </p>
      </div>

      <div className="feature-card">
        <span className="icon grid-icon"></span>
        <h3>Smart Content Calendar</h3>
        <p>
        Simplifies post planning across social platforms, allowing you to schedule content daily, weekly, or monthly with ease.
         Stay on track with reminders and notifications, ensuring you never miss a post even when you're busy!
        </p>
      </div>

      <div className="feature-card">
        <span className="icon chart-icon"></span>
        <h3>Competitor & Sentiment Intelligence</h3>
        <p>
        Tracks strategy shifts in competitors while monitoring positive and negative PR around your posts. Gain real time insights to stay ahead, adapt quickly, 
        and manage your brand’s reputation effectively!

        </p>
      </div>

      <div className="feature-card">
        <span className="icon users-icon"></span>
        <h3>Telegram Bot Assistant</h3>
        <p>
        Makes scheduling effortless schedule posts, track status and receive real time notifications right from Telegram. Stay updated on competitor strategy shifts and sentiment changes, ensuring you're always ahead with instant alerts!

        </p>
      </div>
    </div>
  </section>
  )
}

export default Benifits