import React, { useState } from "react";
import axios from "axios"; // Import Axios
import photo from "../assets/signin_img.png";
import { url } from "globalbackendurl";
const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // For user feedback

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending request...");

    try {
      const response = await axios.post(
        `${url}/api/user/register`, // Backend API
        {
          name: username,
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Response received:", response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex min-h-screen w-full mx-auto font-serif">
      {/* Left Section */}
      <div className="flex-1 bg-[#456ec8c9] text-white p-4">
        <div className="mb-3"></div>
        <div className="max-w-xl">
          <h1 className="text-4xl mb-5 ml-5">Do more in less time with our Trendify!</h1>
          <p className="text-lg mb-8 ml-5 leading-relaxed">
          Our dashboard is easy to use, intuitive, and packed with powerful features for seamless exploration          </p>
          <div className="bg-white/10 p-6 rounded-lg mb-8 ml-5">
            <p className="font-bold mb-2">Empowering Insights, Elevating Growth.</p>
          </div>
          <div className="mt-0">
            <img src={photo} alt="AI Assistant" className="max-w-full h-auto" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-3xl text-[#1d3557] mb-8">Sign Up</h2>

          {message && <p className="text-center text-red-600 mb-4">{message}</p>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="username" className="block text-[#1d3557]">Username</label>
              <input
                type="text"
                id="username"
                required
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-[#1d3557]">Email</label>
              <input
                type="email"
                id="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-[#1d3557]">Password</label>
                <a href="/forgot" className="text-sm text-[#457b9d] hover:underline">Forgot password?</a>
              </div>
              <input
                type="password"
                id="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#456EC8] text-white py-3 rounded-md hover:bg-[#5593D7] focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
