import { useEffect, useState } from "react";
import JobCard from "../../components/JobCard/JobCard.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import JobSearchBar from "../../features/jobs/JobSearchBar.jsx";
import { getAllJobs } from "../../services/job.services.js";

const JobsPage = () => {
    const [jobs, setJobs] = useState([]);
    const [filters, setFilters] = useState({ search: "", location: "", employmentType: "" });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const response = await getAllJobs({
                    ...filters,
                    page,
                    limit: 9,
                    sort: "newest"
                });
                setJobs(response.data);
                setTotalPages(response.totalPages);
            } catch (error) {
                setError("Unable to load jobs!");
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [filters, page]);

    const handleSearch = (newFilters) => {
        setPage(1);
        setFilters(newFilters);
    }

    return (
        <section className="py-16 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-center">Job Listings</h1>
                <p className="text-gray-600 text-center mt-4">Browse and search through all open positions.</p>

                <div className="mt-10">
                    <JobSearchBar onSearch={handleSearch} />
                </div>

                {loading && <Loader message="Loading jobs..." />}
                {!loading && error && <p className="text-center text-red-600 mt-10">{error}</p>}
                {!loading && !error && jobs.length === 0 && (
                    <p className="text-center text-gray-600 mt-10">No jobs found matching your search.</p>
                )}

                {!loading && !error && jobs.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                            {jobs.map(job => (
                                <JobCard
                                    key={job._id}
                                    id={job._id}
                                    company={job.company}
                                    title={job.title}
                                    location={job.location}
                                    salary={job.salary}
                                    type={job.employmentType}
                                    skills={job.requirements}
                                />
                            ))}
                        </div>

                        <div className="flex justify-center items-center gap-4 mt-12">
                            <button
                                onClick={() => setPage((previousPage) => Math.max(previousPage - 1, 1))}
                                disabled={page === 1}
                                className="px-4 py-2 rounded-lg border border-slate-300 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span className="font-medium">Page {page} of {totalPages}</span>
                            <button
                                onClick={() => setPage((previousPage) => Math.min(previousPage + 1, totalPages))}
                                disabled={page === totalPages}
                                className="px-4 py-2 rounded-lg border border-slate-300 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default JobsPage;