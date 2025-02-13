const getWelcomeEmailTemplate = (userName) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Trendify Analytics</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #FCE9DB; /* Light skin-tone background */
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        background-color: #ffffff; /* White background for the template */
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        margin: auto;
      }
      h1, p, li, strong, .footer {
        color: #000000; /* Black font color */
      }
      p {
        font-size: 16px;
        line-height: 1.5;
      }
      ul {
        text-align: left;
        padding: 0;
        list-style: none;
      }
      li {
        padding: 8px 0;
        font-size: 16px;
      }
      a {
        color: #000000;
        text-decoration: none;
        font-weight: bold;
      }
      .footer {
        margin-top: 20px;
        font-size: 14px;
      }
    </style>
  </head>
  <body>

    <div class="container">
      <h1>Welcome Aboard, ${userName}! 🎉</h1>
      <p><strong>Congratulations!</strong> Your account on <strong>Trendify Analytics</strong> is now active, and we’re thrilled to have you with us! 🚀</p>

      <h3>What’s Next? Here’s What You Can Do:</h3>
      <ul>
        <li>✅ <strong>Track Your Social Media Performance:</strong> Gain insights into engagement, trends, and sentiment across platforms.</li>
        <li>📊 <strong>Uncover Actionable Insights:</strong> Leverage in-depth reports to make smarter, data-driven decisions.</li>
        <li>📈 <strong>Optimize Your Strategy:</strong> Stay ahead with personalized recommendations to boost your impact.</li>
        <li>📌 <strong>Competitor Analysis:</strong> Stay ahead of your competitors by tracking their strategies and engagement.</li>
        <li>📅 <strong>Post Scheduling:</strong> Plan and automate your social media posts to maintain consistency.</li>
        <li>🤖 <strong>Schedule Posts Using Telegram Bot:</strong> Automate content posting directly from Telegram.</li>
        <li>🧠 <strong>Sentiment Analysis of Posts:</strong> Understand audience reactions with AI-driven sentiment analysis.</li>
      </ul>

      <p>💡 Need help? Our team is here for you! Reach out anytime at <a href="mailto:support@trendify.com">support@trendify.com</a>.</p>

      <p class="footer">Wishing you success in your social media journey!</p>
      <p class="footer"><strong>Cheers,</strong><br><strong>The Trendify Analytics Team</strong> 🚀</p>
    </div>

  </body>
  </html>
`;

module.exports = getWelcomeEmailTemplate;
