// client/src/pages/EditJob/EditJobPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import JobForm from "../../features/jobs/JobForm";
import { getJobById } from "../../services/job.services.js";

const EditJobPage = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await getJobById(id);
                const jobData = response.data;
                setJob({
                    title: jobData.title,
                    company: jobData.company,
                    location: jobData.location,
                    employmentType: jobData.employmentType,
                    salary: jobData.salary,
                    description: jobData.description,
                    requirements: jobData.requirements?.join(", ") || ""
                });
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
                <Loader message="Loading job..." />
            </section>
        );
    }

    if (error) {
        return <p className="text-center text-red-600 py-20">{error}</p>;
    }

    return (
        <section className="min-h-screen bg-slate-50 flex justify-center items-center px-6 py-16">
            <JobForm initialData={job} jobId={id} />
        </section>
    )
}

export default EditJobPage;