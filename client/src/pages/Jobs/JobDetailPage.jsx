import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import Button from "../../components/Button/Button.jsx";
import { getJobById } from "../../services/job.services.js";
import { useAuth } from "../../context/AuthContext.jsx";

const JobDetailPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [job, setJob] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await getJobById(id);
                setJob(response.data);
            } catch (error) {
                setError("Unable to load this job.");
            } finally {
                setLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    if (loading) {
        return (
            <section className="py-20 text-center">
                <Loader message="Loading job details..." />
            </section>
        );
    }

    if (error || !job) {
        return (
            <section className="py-20 text-center text-red-600">
                {error || "Job not found."}
            </section>
        );
    }

    return (
        <section className="py-16 bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-6 bg-white rounded-xl shadow-sm p-10">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold">{job.title}</h1>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">{job.employmentType}</span>
                </div>
                <p className="text-xl text-gray-700 mt-2">{job.company}</p>
                <p className="text-gray-600 mt-2">{job.location}</p>
                {job.salary && (
                    <p className="text-blue-600 font-semibold text-lg mt-4">
                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(job.salary)}
                    </p>
                )}

                <h2 className="text-xl font-bold mt-8">Job Description</h2>
                <p className="text-gray-700 mt-2 whitespace-pre-line">{job.description}</p>

                {job.requirements?.length > 0 && (
                    <>
                        <h2 className="text-xl font-bold mt-8">Requirements</h2>
                        <div className="flex flex-wrap gap-2 mt-4">
                            {job.requirements.map((requirement) => (
                                <span key={requirement} className="bg-slate-100 text-gray-700 px-3 py-1 rounded-full text-sm">{requirement}</span>
                            ))}
                        </div>
                    </>
                )}

                <div className="mt-10">
                    {!user && (
                        <Link to="/login">
                            <Button>Login to Apply</Button>
                        </Link>
                    )}
                    {user?.role === "CANDIDATE" && (
                        <Link to={`/jobs/${job._id}/apply`}>
                            <Button>Apply Now</Button>
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}

export default JobDetailPage;