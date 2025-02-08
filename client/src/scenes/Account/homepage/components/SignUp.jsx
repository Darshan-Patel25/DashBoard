import React, { useState } from 'react'
import "../Styles/SignIn.css"

const SignUp = () => {
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(username);
        console.log(email);
        console.log(password);
        
    }
  return (
    <div className="container" style={{margin:"0 auto"}}>
    {/* Left Section */}
    <div className="left-side">
      <div className="logo">
        {/* <img src="/placeholder.svg?height=40&width=150" alt="Logo" /> */}
      </div>

      <div className="hero-content">
        <h1>Do more in less time with OwlyWriter AI</h1>
        <p className="hero-text">
          Generate captions and posts in seconds! OwlyWriter AI makes content creation seriously easy for busy social
          pros like you.
        </p>

        <div className="info-box">
          <p className="info-title">Our AI tool is so simple to use, anyone can do it.</p>
          <p className="info-subtitle">Click Inspiration to get started.</p>
        </div>

        <div className="hero-image">
          <img
            src="src/assets/signin_img.png"
            alt="AI Assistant"
          />
        </div>
      </div>
    </div>

    {/* Right Section */}
    <div className="right-side">
      <div className="form-wrapper">
        <h2>Sign Up</h2>

        <form className="signin-form">
        <div className="input-group">
            <label htmlFor="email">Username</label>
            <input type="text" id="username" required onChange={(e)=>setUsername(e.target.value)} />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required onChange={(e)=>setEmail(e.target.value)} />
          </div>
          
          <div className="input-group">
            <div className="password-header">
              <label htmlFor="password">Password</label>
              <a href="/forgot" className="forgot-link">
                Forgot password
              </a>
            </div>
            <input type="password" id="password" required onChange={(e)=>setPassword(e.target.value)} />
          </div>

          <button type="submit" className="btn btn-primary"
          onClick={handleSubmit}
          >
            Sign Up
          </button>


          {/* <p className="terms-text">
            By selecting Sign in, I agree to <a href="/terms">Hootsuite's Terms</a>, including the payment terms, and{" "}
            <a href="/privacy">Privacy Policy</a>
          </p> */}

          
        </form>
      </div>
    </div>
  </div>
  )
}

export default SignUp