// client/src/features/applications/MyApplicationsList.jsx
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader.jsx";
import { getMyApplications, withdrawApplication } from "../../services/application.service.js";

const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-700",
    ACCEPTED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700"
};

const MyApplicationsList = () => {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const response = await getMyApplications({ page: 1, limit: 20 });
            setApplications(response.data);
        } catch (error) {
            setError("Unable to load your applications.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleWithdraw = async (applicationId) => {
        if (!window.confirm("Withdraw this application?")) return;
        try {
            await withdrawApplication(applicationId);
            fetchApplications();
        } catch (error) {
            setError("Unable to withdraw this application.");
        }
    }

    if (loading) {
        return <Loader message="Loading your applications..." />;
    }

    if (error) {
        return <p className="text-center text-red-600">{error}</p>;
    }

    if (applications.length === 0) {
        return <p className="text-center text-gray-600">You haven't applied to any jobs yet.</p>;
    }

    return (
        <div className="space-y-4">
            {applications.map((application) => (
                <div key={application._id} className="bg-white border rounded-xl p-6 shadow-sm flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold">{application.job?.title}</h3>
                        <p className="text-gray-600">{application.job?.company} • {application.job?.location}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[application.status]}`}>{application.status}</span>
                        {application.status === "PENDING" && (
                            <button onClick={() => handleWithdraw(application._id)} className="text-red-600 font-semibold">Withdraw</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MyApplicationsList;