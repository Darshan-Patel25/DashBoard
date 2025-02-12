import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#3D3A3D] text-white py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {/* Left Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Get real-time insights on audience growth, follower trends, and potential clients, all in one place
          </h3>
        </div>

        {/* Middle Section */}
        <div>
          <nav>
            <ul className="space-y-2">
              <li>
                <a href="/dashboard" className="text-gray-400 hover:text-white">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/analytics" className="text-gray-400 hover:text-white">
                  Analytics
                </a>
              </li>
              <li>
                <a href="/aboutus" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
          <p className="text-gray-400 mb-4">
            Join our newsletter to stay up to date on features and releases.
          </p>
          <div className="flex space-x-2 mb-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-2 bg-[#2C292B] border-none rounded-md text-white placeholder-gray-300 focus:outline-none"
            />
            <button className="bg-[#456EC8] text-white px-5 py-2 rounded-md border-none font-medium text-lg cursor-pointer transition-colors duration-200 hover:bg-[#5593D7]">
              Subscribe
            </button>
          </div>
          <small className="text-gray-500">
            By subscribing you agree with our Privacy Policy and provide consent to receive updates from our company.
          </small>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-6xl mx-auto mt-8 border-t border-gray-700 pt-4 flex justify-between items-center px-4">
        <p>© 2025 Trendify. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#privacy" className="text-gray-400 hover:text-white">
            Privacy Policy
          </a>
          <a href="#terms" className="text-gray-400 hover:text-white">
            Terms of use
          </a>
          <a href="#cookies" className="text-gray-400 hover:text-white">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;