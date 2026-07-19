import { useEffect, useState } from "react";
import JobCard from "../../components/JobCard/JobCard.jsx";
import { getAllJobs } from "../../services/job.services.js";
import Loader from "../../components/Loader/Loader.jsx";

const FeaturedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await getAllJobs({
                    page: 1,
                    limit: 6,
                    sort: "newest"
                });
                console.log(response.data);

                setJobs(response.data);
            } catch (error) {
                setError("Unable to load jobs!")
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    if (loading) {
        return (
            <section className="py-20 text-center">
                <Loader message="Loading..." />
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 text-center">
                {error}
            </section>
        )
    }

    return (

        <section className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl font-bold text-center">Featured Jobs</h2>
                <p className="text-gray-600 text-center mt-4">Explore the latest opportunities.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {
                        jobs.map(job => (
                            <JobCard
                                key={job._id}
                                company={job.company}
                                title={job.title}
                                location={job.location}
                                salary={job.salary}
                                type={job.employmentType}
                                skills={job.requirement}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    );

};

export default FeaturedJobs;





