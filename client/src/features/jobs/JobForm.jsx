// client/src/features/jobs/JobForm.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button/Button.jsx";
import { createJob, updateJob } from "../../services/job.services.js";

const JobForm = ({ initialData, jobId }) => {
    const isEdit = Boolean(jobId);
    const navigate = useNavigate();

    const [formData, setFormData] = useState(initialData || {
        title: "",
        company: "",
        location: "",
        employmentType: "Full-Time",
        salary: "",
        description: "",
        requirements: ""
    });

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setError("");
            setMessage("");

            const payload = {
                ...formData,
                salary: Number(formData.salary),
                requirements: typeof formData.requirements === "string"
                    ? formData.requirements.split(",").map((requirement) => requirement.trim()).filter(Boolean)
                    : formData.requirements
            };

            if (isEdit) {
                const response = await updateJob(jobId, payload);
                setMessage(response.message);
            } else {
                const response = await createJob(payload);
                setMessage(response.message);
            }

            setTimeout(() => navigate("/employer/jobs"), 1500);
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-md">
            <div className="space-y-2 text-center">
                <h1 className="font-bold text-3xl">{isEdit ? "Edit Job" : "Post a New Job"}</h1>
                <p className="text-sm text-slate-600">{isEdit ? "Update the job details below" : "Fill in the details to publish a job"}</p>
            </div>
            <form onSubmit={handleSubmit}>
                {message && (<p className="mb-4 rounded-lg bg-green-100 px-4 py-2 text-green-700">{message}</p>)}
                {error && (<p className="mb-4 rounded-lg bg-red-100 px-4 py-2 text-red-700">{error}</p>)}

                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2 font-medium">Job Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="company" className="block mb-2 font-medium">Company</label>
                    <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className="block mb-2 font-medium">Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="employmentType" className="block mb-2 font-medium">Employment Type</label>
                    <select name="employmentType" value={formData.employmentType} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="salary" className="block mb-2 font-medium">Salary (Annual, INR)</label>
                    <input type="number" name="salary" value={formData.salary} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2 font-medium">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="5" className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>
                <div className="mb-6">
                    <label htmlFor="requirements" className="block mb-2 font-medium">Requirements (comma separated)</label>
                    <input type="text" name="requirements" value={formData.requirements} onChange={handleChange} placeholder="React, Node.js, MongoDB" className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>

                <Button type="submit" disabled={loading}>
                    {loading ? "Saving ...." : isEdit ? "Update Job" : "Publish Job"}
                </Button>
            </form>
        </div>
    );
}

export default JobForm;