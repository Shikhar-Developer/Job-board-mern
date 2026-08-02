// client/src/features/profile/CandidateProfileForm.jsx
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader.jsx";
import Button from "../../components/Button/Button.jsx";
import { getCandidateProfile, updateCandidateProfile } from "../../services/candidate.service.js";

const CandidateProfileForm = () => {
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getCandidateProfile();
                const profile = response.data;
                setFormData({
                    name: profile.user?.name || "",
                    phoneNumber: profile.phoneNumber || "",
                    address: profile.address || "",
                    city: profile.city || "",
                    state: profile.state || "",
                    country: profile.country || "",
                    highestQualification: profile.highestQualification || "",
                    college: profile.college || "",
                    university: profile.university || "",
                    branch: profile.branch || "",
                    cgpa: profile.cgpa || "",
                    experience: profile.experience || "",
                    skills: profile.skills?.join(", ") || "",
                    linkedin: profile.linkedin || "",
                    github: profile.github || "",
                    portfolio: profile.portfolio || ""
                });
            } catch (error) {
                setError("Unable to load your profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

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
            setSaving(true);
            setError("");
            setMessage("");

            const payload = {
                ...formData,
                skills: formData.skills.split(",").map((skill) => skill.trim()).filter(Boolean)
            };

            const response = await updateCandidateProfile(payload);
            setMessage(response.message);
        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return <Loader message="Loading your profile..." />;
    }

    return (
        <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-md">
            <div className="space-y-2 text-center">
                <h1 className="font-bold text-3xl">My Profile</h1>
                <p className="text-sm text-slate-600">Keep your details up to date</p>
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
                        <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="linkedin" className="block mb-2 font-medium">LinkedIn</label>
                        <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="github" className="block mb-2 font-medium">GitHub</label>
                        <input type="text" name="github" value={formData.github} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="portfolio" className="block mb-2 font-medium">Portfolio</label>
                        <input type="text" name="portfolio" value={formData.portfolio} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                <div className="mt-6">
                    <Button type="submit" disabled={saving}>{saving ? "Saving ...." : "Save Profile"}</Button>
                </div>
            </form>
        </div>
    );
}

export default CandidateProfileForm;