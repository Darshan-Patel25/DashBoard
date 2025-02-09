const getPostSuccessEmailTemplate = (userName, postContent, postDate) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <h2 style="color: #4CAF50;">🎉 Hello ${userName},</h2>
    <p>Your post has been successfully published on <strong>${postDate}</strong>!</p>
    
    <h3>📢 Post Content:</h3>
    <p style="background: #f9f9f9; padding: 15px; border-radius: 5px; font-style: italic;">"${postContent}"</p>

    <h3>🔥 What Next?</h3>
    <ul style="padding-left: 20px;">
      <li>📊 Monitor its performance on your <a href="https://your-platform-link.com/dashboard" style="color: #4CAF50; text-decoration: none;">dashboard</a>.</li>
      <li>💡 Discover insights to optimize future posts.</li>
      <li>🚀 Stay tuned for analytics updates.</li>
    </ul>

    <p>If you have any questions or need help, please reach out to our support team at <a href="mailto:support@yourdomain.com" style="color: #4CAF50;">support@yourdomain.com</a>.</p>

    <p>Happy Posting! 🚀</p>

    <p>Best Regards,</p>
    <p><strong>Your Team at Social Analytics</strong></p>
  </div>
`;

module.exports = getPostSuccessEmailTemplate;
