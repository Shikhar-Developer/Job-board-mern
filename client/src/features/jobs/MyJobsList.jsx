// client/src/features/jobs/MyJobsList.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import Button from "../../components/Button/Button.jsx";
import { getMyJobs, deleteJob } from "../../services/job.services.js";

const MyJobsList = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response = await getMyJobs();
            setJobs(response.data);
        } catch (error) {
            setError("Unable to load your jobs.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this job?")) return;
        try {
            await deleteJob(id);
            setJobs((previousJobs) => previousJobs.filter((job) => job._id !== id));
        } catch (error) {
            setError("Unable to delete this job.");
        }
    }

    if (loading) {
        return <Loader message="Loading your jobs..." />;
    }

    if (error) {
        return <p className="text-center text-red-600">{error}</p>;
    }

    if (jobs.length === 0) {
        return <p className="text-center text-gray-600">You haven't posted any jobs yet.</p>;
    }

    return (
        <div className="space-y-4">
            {jobs.map((job) => (
                <div key={job._id} className="bg-white border rounded-xl p-6 shadow-sm flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <p className="text-gray-600">{job.company} • {job.location}</p>
                        <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">{job.employmentType}</span>
                    </div>
                    <div className="flex gap-3">
                        <Link to={`/employer/jobs/${job._id}/applicants`} className="text-blue-600 font-semibold hover:text-blue-700">Applicants</Link>
                        <Link to={`/employer/jobs/${job._id}/edit`} className="text-blue-600 font-semibold hover:text-blue-700">Edit</Link>
                        <button onClick={() => handleDelete(job._id)} className="text-red-600 font-semibold">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MyJobsList;