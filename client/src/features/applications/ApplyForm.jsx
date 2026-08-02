import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button/Button.jsx";
import { applyForJob } from "../../services/application.service.js";

const ApplyForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        city: "",
        state: "",
        country: "",
        highestQualification: "",
        passingYear: "",
        college: "",
        university: "",
        branch: "",
        cgpa: "",
        experience: "",
        skills: "",
        message: ""
    });
    const [resume, setResume] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    }

    const handleFileChange = (event) => {
        setResume(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setError("");
            setMessage("");

            if (!resume) {
                setError("Please upload your resume.");
                setLoading(false);
                return;
            }

            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => data.append(key, value));
            data.append("resume", resume);

            const response = await applyForJob(id, data);
            setMessage(response.message);
            setTimeout(() => navigate("/my-applications"), 2000);
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-md">
            <div className="space-y-2 text-center">
                <h1 className="font-bold text-3xl">Apply for this Job</h1>
                <p className="text-sm text-slate-600">Fill in your details to submit your application</p>
            </div>
            <form onSubmit={handleSubmit}>
                {message && (<p className="mb-4 rounded-lg bg-green-100 px-4 py-2 text-green-700">{message}</p>)}
                {error && (<p className="mb-4 rounded-lg bg-red-100 px-4 py-2 text-red-700">{error}</p>)}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 font-medium">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block mb-2 font-medium">Phone Number</label>
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="address" className="block mb-2 font-medium">Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="city" className="block mb-2 font-medium">City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="state" className="block mb-2 font-medium">State</label>
                        <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="country" className="block mb-2 font-medium">Country</label>
                        <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="highestQualification" className="block mb-2 font-medium">Highest Qualification</label>
                        <input type="text" name="highestQualification" value={formData.highestQualification} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="passingYear" className="block mb-2 font-medium">Passing Year</label>
                        <input type="number" name="passingYear" value={formData.passingYear} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="college" className="block mb-2 font-medium">College</label>
                        <input type="text" name="college" value={formData.college} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="university" className="block mb-2 font-medium">University</label>
                        <input type="text" name="university" value={formData.university} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="branch" className="block mb-2 font-medium">Branch</label>
                        <input type="text" name="branch" value={formData.branch} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="cgpa" className="block mb-2 font-medium">CGPA</label>
                        <input type="number" step="0.01" name="cgpa" value={formData.cgpa} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="experience" className="block mb-2 font-medium">Experience (Years)</label>
                        <input type="number" name="experience" value={formData.experience} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="skills" className="block mb-2 font-medium">Skills (comma separated)</label>
                        <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="React, Node.js, MongoDB" className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="message" className="block mb-2 font-medium">Message to Employer</label>
                        <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="resume" className="block mb-2 font-medium">Resume (PDF)</label>
                        <input type="file" name="resume" accept=".pdf" onChange={handleFileChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                <div className="mt-6">
                    <Button type="submit" disabled={loading}>{loading ? "Submitting ...." : "Submit Application"}</Button>
                </div>
            </form>
        </div>
    );
}

export default ApplyForm;