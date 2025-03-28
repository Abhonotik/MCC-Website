import React, { useState, useEffect } from "react";

const UserProfile = () => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        // Fetch user profile from the backend
        fetch("/api/profile")
            .then((res) => res.json())
            .then((data) => setProfile(data));
    }, []);

    return (
        <div>
            <h1>User Profile</h1>
            <p>Name: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone}</p>
        </div>
    );
};

export default UserProfile;
