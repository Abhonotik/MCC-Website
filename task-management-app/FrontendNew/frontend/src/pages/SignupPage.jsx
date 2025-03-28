import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";
import "../styles/SignupPage.css"; // Importing the CSS file

const SignupPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await registerUser({ name, email, password });
            if (response.message === "User registered successfully") {
                navigate("/login");  // Redirect to login page
            } else {
                setError(response.message || "Signup failed.");
            }
        } catch (error) {
            console.error("Signup failed:", error);
            setError("Signup failed. Please try again.");
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2 className="signup-title">Sign Up</h2>
                {error && <p className="error-message">{error}</p>}
                
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Full Name" 
                    className="input-field"
                    required
                />
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    className="input-field"
                    required
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password" 
                    className="input-field"
                    required
                />
                <button type="submit" className="signup-button">Sign Up</button>
                
                <p className="login-text">
                    Already have an account? <a href="/login" className="login-link">Login</a>
                </p>
            </form>
        </div>
    );
};

export default SignupPage;
