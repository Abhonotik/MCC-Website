import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import './App.css'; // Import the CSS file

// Import Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/dashboard";
import AdminPage from "./pages/AdminPage";
import TaskPage from "./pages/tasks";
import Navbar from "./components/Navbar";

// Private Route Component
const PrivateRoute = ({ element, expectedRole }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.warn("No token found. Redirecting to login.");
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        const userRole = decoded.role || "user";

        if (expectedRole && userRole !== expectedRole) {
            console.warn(`Unauthorized: Expected ${expectedRole}, but found ${userRole}`);
            return <Navigate to={userRole === "admin" ? "/admin" : "/dashboard"} replace />;
        }

        return element;
    } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        return <Navigate to="/login" replace />;
    }
};

// Layout Component to Control Navbar Visibility
const Layout = ({ children }) => {
    const location = useLocation();
    const hideNavbarRoutes = ["/", "/login", "/register"];
    const showNavbar = !hideNavbarRoutes.includes(location.pathname);

    return (
        <>
            {showNavbar && <Navbar />}
            {children}
        </>
    );
};

// App Component
function App() {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserRole(decoded.role || "user");
            } catch (error) {
                console.error("Failed to decode token:", error);
                setUserRole(null);
            }
        }
    }, []);

    return (
        <Router>
            <Layout>
                <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
                    <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<SignupPage />} />

                            {/* Private Routes */}
                            <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} expectedRole="user" />} />
                            <Route path="/admin" element={<PrivateRoute element={<AdminPage />} expectedRole="admin" />} />
                            <Route path="/tasks" element={<PrivateRoute element={<TaskPage />} />} />
                        </Routes>
                    </div>
                </div>
            </Layout>
        </Router>
    );
}

export default App;
