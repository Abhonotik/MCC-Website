import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";
import "../styles/LoginPage.css"; // Import the updated CSS

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); // React Router navigation hook

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message

        try {
            const response = await loginUser({ email, password });
            if (response.token) {
                localStorage.setItem("token", response.token);
                navigate("/dashboard"); // Redirect to Dashboard after login
            } else {
                setError("Invalid login credentials.");
            }
        } catch (error) {
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">Welcome Back</h2>

                {error && <p className="error-message">{error}</p>}

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="input-field"
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="input-field"
                        required
                    />
                </div>

                <button type="submit" className="login-button">Login</button>

                <p className="signup-text">
                    Don't have an account?{" "}
                    <span className="signup-link" onClick={() => navigate("/register")}>
                        Sign Up
                    </span>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
