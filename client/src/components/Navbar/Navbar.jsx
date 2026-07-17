import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-8 py-4 border-b">
            <h1 className="text-2xl font-bold">Kaam</h1>
            <div className="flex gap-6">
                <Link to="/">Home</Link>
                <Link to="/jobs">Jobs</Link>
                <Link to="/about">About</Link>
            </div>
            <div className="flex gap-4">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    );
}

export default Navbar;