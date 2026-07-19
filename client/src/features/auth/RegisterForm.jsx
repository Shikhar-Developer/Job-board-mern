import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button/Button.jsx"
import { register } from "../../services/auth.service.js"



const RegisterForm = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "CANDIDATE" });


    const [error, setError] = useState(false);
    const [message, setMessage] = useState(false);
    const [loading, setLoading] = useState(false);
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
            setMessage("");
            const response = await register(formData);
            setMessage(response.message);
            console.log(response);
            setTimeout(() => { navigate("/login") }, 2000);
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
            console.log(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md">
            <div className="space-y-2 text-center">
                <h1 className="font-bold text-3xl">Create your Account</h1>
                <p className="text-sm text-slate-600">Join Thousands of Users</p>
            </div>
            <form onSubmit={handleSubmit}>
                {message && (<p className="mb-4 rounded-lg bg-green-100 px-4 py-2 text-green-700">{message}</p>)}
                {error && (<p className="mb-4 rounded-lg bg-red-100 px-4 py-2 text-red-700">{error}</p>)}
                <div className="mb-2">
                    <label htmlFor="name" className="block mb-2 font-medium"> Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-2">
                    <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your Email" className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="block mb-2 font-medium">Password</label>
                    <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder="Enter Password" className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium ">Register as</label>
                    <select name="role" value={formData.role} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="CANDIDATE">Candidate</option>
                        <option value="EMPLOYER">Employer</option>
                    </select>
                </div>
                <Button type="submit" disabled={loading}>{loading ? "Creating Account ...." : "Create Account"}</Button>
            </form >
            <p className="mt-6 text-center text-sm text-slate-600">
                Already have an Account<Link
                    to="/login" className="text-blue-600 font-semibold hover:text-blue-700"> Sign In</Link>
            </p>
        </div >
    );
}

export default RegisterForm;