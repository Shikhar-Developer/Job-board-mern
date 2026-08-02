// client/src/features/profile/EmployerProfileForm.jsx
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader.jsx";
import Button from "../../components/Button/Button.jsx";
import { getEmployerProfile, updateEmployerProfile } from "../../services/employer.service.js";

const EmployerProfileForm = () => {
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getEmployerProfile();
                const profile = response.data;
                setFormData({
                    name: profile.user?.name || "",
                    companyName: profile.companyName || "",
                    designation: profile.designation || "",
                    companyEmail: profile.companyEmail || "",
                    companyWebsite: profile.companyWebsite || "",
                    companyAddress: profile.companyAddress || "",
                    phoneNumber: profile.phoneNumber || ""
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
            const response = await updateEmployerProfile(formData);
            setMessage(response.message || "Profile updated successfully.");
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
                <h1 className="font-bold text-3xl">Company Profile</h1>
                <p className="text-sm text-slate-600">Keep your company details up to date</p>
            </div>
            <form onSubmit={handleSubmit}>
                {message && (<p className="mb-4 rounded-lg bg-green-100 px-4 py-2 text-green-700">{message}</p>)}
                {error && (<p className="mb-4 rounded-lg bg-red-100 px-4 py-2 text-red-700">{error}</p>)}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 font-medium">Your Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="designation" className="block mb-2 font-medium">Designation</label>
                        <input type="text" name="designation" value={formData.designation} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="companyName" className="block mb-2 font-medium">Company Name</label>
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="companyEmail" className="block mb-2 font-medium">Company Email</label>
                        <input type="email" name="companyEmail" value={formData.companyEmail} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="companyWebsite" className="block mb-2 font-medium">Company Website</label>
                        <input type="text" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber" className="block mb-2 font-medium">Phone Number</label>
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label htmlFor="companyAddress" className="block mb-2 font-medium">Company Address</label>
                        <input type="text" name="companyAddress" value={formData.companyAddress} onChange={handleChange} className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                <div className="mt-6">
                    <Button type="submit" disabled={saving}>{saving ? "Saving ...." : "Save Profile"}</Button>
                </div>
            </form>
        </div>
    );
}

export default EmployerProfileForm;