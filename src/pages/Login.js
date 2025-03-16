
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"; // Make sure to import your CSS file

const SignUpLogInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  //const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Navigation hook
  const [isActive, setIsActive] = useState(false);
 // const [username2, setUsername2] = useState("");
  //const [password2, setPassword2] = useState("");
  const [isSubmitting2, setIsSubmitting2] = useState(false);
  //const [message2, setMessage2] = useState("");
 // const [error2, setError2] = useState("");

  const handleRegisterClick = () => {
    setIsActive(true); // Set to true to show the Register form
  };

  const handleLoginClick = () => {
    setIsActive(false); // Set to false to show the Login form
  };

  const LoadingPopup = () => {
    return (
      <div class="loader">
          <div class="cir1"></div>
          <div class="cir2"></div>
          <div class="cir3"></div>
          <div class="cir4"></div>
          <div class="cir5"></div>
      </div>
    );
  };

  
  const [isLoggingIn, setIsLoggingIn] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();
  
  setIsLoggingIn(true); // Show loading popup
  setMessage("");
  setError("");

  try {
    const response = await axios.post("https://backendjt-1.onrender.com/login", {
      username,
      password,
    });

    setMessage(response.data.message);
    localStorage.setItem("username", username);
    navigate("/home");
  } catch (err) {
    setError(err.response?.data?.error || "An unexpected error occurred.");
  } finally {
    setIsLoggingIn(false); // Hide loading popup
  }
};


  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting2(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post("https://backendjt-1.onrender.com/create", {
        username,
        password,
        fullname,
        email,
        address,
        phone,
        question,
        answer
      });

      setMessage(response.data.message);

      // Reset form fields
      setUsername("");
      setPassword("");
      setFullname("");
      setEmail("");
      setAddress("");
      setPhone("");

      // Switch to login form
      setIsActive(false);
    } catch (err) {
      setError(err.response?.data?.error || "An unexpected error occurred.");
    } finally {
      setIsSubmitting2(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forpass"); // Navigate to the Forgot Password page
  };

  return (
    <div className="juju">
      {isLoggingIn && <LoadingPopup />}
      <div className={`container ${isActive ? "active" : ""}`}>
        <div
          className={`form-box login ${isActive ? "hidden" : ""}`}
          onSubmit={handleLogin}
        >
          <form action="#">
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="forgot-link">
            <button type="button" onClick={handleForgotPassword} className="forgot-password-btn">
              Forgot Password?
            </button>
            </div>
            <button type="submit" className="btn" disabled={isSubmitting2}>
              Login
            </button>
          </form>
        </div>

        <div
          className={`form-box register ${isActive ? "visible" : ""}`}
          onSubmit={handleSignup}
        >
          <form action="#">
            <h1>Registration</h1>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <i className="bx bxs-user"></i>
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className="bx bxs-envelope"></i>
            </div>
            <div className="input-box">
              <input
                type="fullname"
                placeholder="Full Name"
                onChange={(e) => setFullname(e.target.value)}
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="input-box">
              <input
                type="address"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="input-box">
              <input
                type="phone"
                placeholder="Phone"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className="input-box">
              <select
                onChange={(e) => setQuestion(e.target.value)}
                required
              >
                <option className="opt" value="">Select a security question</option>
                <option className="opt" value="What is your father's first name?">
                  What is your father's first name?
                </option>
                <option className="opt" value="What is your mother's first name?">
                  What is your mother's first name?
                </option>
                <option className="opt" value="What is your best friend's first name?">
                  What is your best friend's first name?
                </option>
              </select>
              <input
                type="text"
                placeholder="Security Question"
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <button type="submit" className="btn" disabled={isSubmitting2}>
              Register
            </button>
          </form>
        </div>

        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Don't have an account?</p>
            <button className="btn register-btn" onClick={handleRegisterClick}>
              Register
            </button>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button className="btn login-btn" onClick={handleLoginClick}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpLogInForm;
