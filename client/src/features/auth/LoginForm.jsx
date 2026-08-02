// client/src/features/auth/LoginForm.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button/Button.jsx"
import { useAuth } from "../../context/AuthContext.jsx"

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            setLoading(true);
            setError("");
            const response = await login(formData);
            navigate(response.data.role === "EMPLOYER" ? "/employer/dashboard" : "/");
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
            <div className="space-y-2 text-center">
                <h1 className="font-bold text-3xl">Welcome Back</h1>
                <p className="text-sm text-slate-600">Sign in to continue</p>
            </div>
            <form onSubmit={handleSubmit}>
                {error && (<p className="mb-4 rounded-lg bg-red-100 px-4 py-2 text-red-700">{error}</p>)}
                <div className="mb-2">
                    <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your Email" className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2 font-medium">Password</label>
                    <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Enter Password" className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <Button type="submit" disabled={loading}>{loading ? "Signing In ...." : "Sign In"}</Button>
            </form>
            <p className="mt-6 text-center text-sm text-slate-600">
                Don't have an Account<Link to="/register" className="text-blue-600 font-semibold hover:text-blue-700"> Sign Up</Link>
            </p>
        </div>
    );
}

export default LoginForm;