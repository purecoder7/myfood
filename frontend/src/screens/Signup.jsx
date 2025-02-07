import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [loginInfo, setLoginInfo] = useState({ name: "", email: "", password: "", address: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    let response = await fetch("https://myfoodbackend.onrender.com/req/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: loginInfo.name,
        email: loginInfo.email,
        password: loginInfo.password,
        location: loginInfo.address
      })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials");
    } else {
      alert("Data Sent");
    }
  };

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input type="text" name="name" className="form-control" placeholder="Enter your name" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" placeholder="Enter your email" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Your Address</label>
            <input type="text" name="address" className="form-control" placeholder="Enter your address" onChange={handleChange} required />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="terms" required />
            <label className="form-check-label" htmlFor="terms">I accept the <a href="#">Terms and Conditions</a></label>
          </div>
          <button type="submit" className="btn btn-primary w-100">Create an account</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
