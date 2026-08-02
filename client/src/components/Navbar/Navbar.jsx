// client/src/components/Navbar/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <nav className="flex justify-between items-center px-8 py-4 border-b">
            <h1 className="text-2xl font-bold">Kaam</h1>
            <div className="flex gap-6">
                <Link to="/">Home</Link>
                <Link to="/jobs">Jobs</Link>
                <Link to="/about">About</Link>
                {user?.role === "EMPLOYER" && <Link to="/employer/dashboard">Dashboard</Link>}
                {user?.role === "EMPLOYER" && <Link to="/employer/jobs">My Jobs</Link>}
                {user?.role === "CANDIDATE" && <Link to="/my-applications">My Applications</Link>}
                {user?.role === "CANDIDATE" && <Link to="/profile">Profile</Link>}
                {user?.role === "EMPLOYER" && <Link to="/employer/profile">Profile</Link>}
            </div>
            <div className="flex gap-4 items-center">
                {user ? (
                    <>
                        <span className="font-medium">Hi, {user.name}</span>
                        <button onClick={handleLogout} className="text-red-600 font-medium">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;