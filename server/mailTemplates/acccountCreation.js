const getWelcomeEmailTemplate = (userName) => `
  <h1 style="color: #4CAF50;">Welcome, ${userName}! 🎉</h1>
  <p>Congratulations! Your account on <strong>Social Analytics</strong> has been successfully created. We're excited to have you on board! 🚀</p>

  <h3>Here’s what you can do now:</h3>
  <ul>
    <li>✅ <strong>Track Your Social Media Performance:</strong> Analyze engagement, trends, and sentiment across multiple platforms.</li>
    <li>📊 <strong>Discover Actionable Insights:</strong> Make data-driven decisions with in-depth reports.</li>
    <li>📈 <strong>Optimize Your Strategy:</strong> Stay ahead of the curve with personalized insights.</li>
  </ul>

  <p>If you have any questions or need help, reach us at <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>.</p>

  <p>Happy Analyzing! 🚀</p>
  <p>Cheers,</p>
  <p><strong>Your Team at Social Analytics</strong></p>
`;

module.exports = getWelcomeEmailTemplate;
