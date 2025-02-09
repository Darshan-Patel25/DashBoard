import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios
import photo from "../assets/signin_img.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // For displaying messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting login...");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/login", // Backend API
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // If your backend uses sessions/cookies
        }
      );

      console.log("Response received:", response.data);
      setMessage(response.data.message); // Display backend response message

      // Redirect or handle login success
      if (response.data.success) {
        window.location.href = "/dashboard"; // Redirect to dashboard
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="flex min-h-screen w-full mx-auto">
      {/* Left Section */}
      <div className="flex-1 bg-blue-600 text-white p-5">
        <div className="mb-10"></div>
        <div className="max-w-xl">
          <h1 className="text-4xl mb-5">Do more in less time with OwlyWriter AI</h1>
          <p className="text-lg mb-8 leading-relaxed">
            Generate captions and posts in seconds! OwlyWriter AI makes content creation seriously easy for busy social pros like you.
          </p>
          <div className="bg-white/10 p-6 rounded-lg mb-8">
            <p className="font-bold mb-2">Our AI tool is so simple to use, anyone can do it.</p>
            <p className="text-teal-300">Click Inspiration to get started.</p>
          </div>
          <div className="mt-10">
            <img src={photo} alt="AI Assistant" className="max-w-full h-auto" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-white flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl text-blue-800 mb-8">Sign in</h2>

          {message && <p className="text-center text-red-600 mb-4">{message}</p>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-blue-800">Email</label>
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
                <label htmlFor="password" className="text-blue-800">Password</label>
                <a href="/forgot" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
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
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Sign in
            </button>

            <div className="text-center">
              <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
