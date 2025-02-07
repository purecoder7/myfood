import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    let navigate = useNavigate();
    const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

    const handleSubmit = async (event) => {
        event.preventDefault();
        let response = await fetch("https://myfoodbackend.onrender.com/req/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: loginInfo.email,
                password: loginInfo.password,
            })
        });
        const json = await response.json();
        if (!json.success) {
            alert("Enter Valid Credentials");
        } else {
            navigate("/");
            alert("Login Success");
            localStorage.setItem("orderMail", loginInfo.email);
            localStorage.setItem("authToken", json.token);
        }
    };

    const handleChange = (e) => {
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ width: "22rem" }}>
                <div className="text-center mb-3">
                    <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" className="mb-2" style={{ width: "40px" }} />
                    <h2 className="h4">Sign in to your account</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Your email</label>
                        <input type="email" name="email" id="email" className="form-control" placeholder="name@company.com" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name="password" id="password" className="form-control" placeholder="••••••••" onChange={handleChange} required />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="remember" required />
                        <label className="form-check-label" htmlFor="remember">Remember me</label>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Sign in</button>
                </form>
                <div className="text-center mt-3">
                    <p className="mb-1">
                        <Link to="/forgot-password" className="text-decoration-none">Forgot password?</Link>
                    </p>
                    <p>
                        Don’t have an account yet? <Link to="/signup" className="text-decoration-none">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
