// client/src/features/applications/JobApplicants.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import { getJobApplicants, acceptApplication, rejectApplication } from "../../services/application.service.js";

const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-700",
    ACCEPTED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700"
};

const JobApplicants = () => {
    const { id } = useParams();
    const [applicants, setApplicants] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchApplicants = async () => {
        try {
            setLoading(true);
            const response = await getJobApplicants(id);
            setApplicants(response.data);
        } catch (error) {
            setError("Unable to load applicants.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplicants();
    }, [id]);

    const handleAccept = async (applicationId) => {
        try {
            await acceptApplication(applicationId);
            fetchApplicants();
        } catch (error) {
            setError("Unable to accept this application.");
        }
    }

    const handleReject = async (applicationId) => {
        try {
            await rejectApplication(applicationId);
            fetchApplicants();
        } catch (error) {
            setError("Unable to reject this application.");
        }
    }

    if (loading) {
        return <Loader message="Loading applicants..." />;
    }

    if (error) {
        return <p className="text-center text-red-600">{error}</p>;
    }

    if (applicants.length === 0) {
        return <p className="text-center text-gray-600">No applications yet for this job.</p>;
    }

    return (
        <div className="space-y-4">
            {applicants.map((application) => (
                <div key={application._id} className="bg-white border rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xl font-bold">{application.applicationDetails?.name}</h3>
                            <p className="text-gray-600">{application.applicationDetails?.email}</p>
                            <p className="text-gray-600 mt-1">{application.applicationDetails?.phoneNumber}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[application.status]}`}>{application.status}</span>
                    </div>

                    {application.applicationDetails?.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {application.applicationDetails.skills.map((skill) => (
                                <span key={skill} className="bg-slate-100 text-gray-700 px-3 py-1 rounded-full text-sm">{skill}</span>
                            ))}
                        </div>
                    )}

                    {application.message && (
                        <p className="text-gray-700 mt-4 italic">"{application.message}"</p>
                    )}

                    <div className="flex gap-4 mt-6 items-center">
                        <a href={`${import.meta.env.VITE_API_URL.replace("/api", "")}/${application.resume}`} target="_blank" rel="noreferrer" className="text-blue-600 font-semibold hover:text-blue-700">
                            View Resume
                        </a>
                        {application.status === "PENDING" && (
                            <>
                                <button onClick={() => handleAccept(application._id)} className="text-green-600 font-semibold">Accept</button>
                                <button onClick={() => handleReject(application._id)} className="text-red-600 font-semibold">Reject</button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default JobApplicants;