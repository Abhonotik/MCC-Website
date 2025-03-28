import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();

    console.log("LandingPage rendered"); // Debug log

    return (
        <div className="landing-container">
            <h1 className="landing-header">Welcome to Task Management</h1>
            <p className="landing-subtext">Choose how you want to start:</p>
            <div className="landing-buttons">
                <button onClick={() => navigate("/login?role=user")} className="landing-button user-btn">
                    Start as User
                </button>
                <button onClick={() => navigate("/login?role=admin")} className="landing-button admin-btn">
                    Start as Admin
                </button>
            </div>
        </div>
    );
};

export default LandingPage;