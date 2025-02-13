const getPostSuccessEmailTemplate = (userEmail, postContent, postDate) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Post Published Successfully</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #F3F4F6;
        margin: 0;
        padding: 20px;
      }
      .container {
        max-width: 600px;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        text-align: left;
        margin: auto;
        border-top: 5px solid #4CAF50;
      }
      h2 {
        color: #4CAF50;
        text-align: center;
      }
      p {
        color: #333;
        font-size: 16px;
        line-height: 1.6;
      }
      .highlight {
        background: #f9f9f9;
        padding: 15px;
        border-left: 5px solid #4CAF50;
        border-radius: 5px;
        font-style: italic;
        font-size: 16px;
        color: #555;
      }
      ul {
        padding-left: 20px;
        margin-top: 10px;
      }
      li {
        margin: 10px 0;
        font-size: 16px;
        color: #333;
      }
      a {
        color: #4CAF50;
        text-decoration: none;
        font-weight: bold;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 14px;
        color: #666;
      }
    </style>
  </head>
  <body>

    <div class="container">
      <h2>🎉 Congratulations, ${userEmail}!</h2>
      <p>Your post has been successfully published on <strong>${postDate}</strong>!</p>

      <h3>📢 Here’s What You Shared:</h3>
      <p class="highlight">"${postContent}"</p>

      <h3>🚀 What’s Next?</h3>
      <ul>
        <li>📊 <strong>Monitor Performance:</strong> Track engagement metrics on your <a href="https://your-platform-link.com/dashboard">dashboard</a>.</li>
        <li>💡 <strong>Gain Insights:</strong> Analyze audience interactions and optimize future posts.</li>
        <li>📢 <strong>Boost Your Post:</strong> Promote it for greater reach and impact.</li>
        <li>📈 <strong>Stay Updated:</strong> Receive personalized analytics to enhance your content strategy.</li>
      </ul>

      <p>Need assistance? Our support team is here for you! Reach out at <a href="mailto:support@trendify.com">support@trendify.com</a>.</p>

      <p class="footer">Keep creating. Keep growing. 🚀</p>
      <p class="footer"><strong>Best Regards,</strong><br><strong>The Trendify Team</strong></p>
    </div>

  </body>
  </html>
`;

module.exports = getPostSuccessEmailTemplate;
