import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import Button from "../../components/Button/Button.jsx";
import DashboardStats from "../../features/dashboard/DashboardStats.js";
import { getEmployerDashboard } from "../../services/dashboard.service.js";

const EmployerDashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getEmployerDashboard();
                setStats(response.data);
            } catch (error) {
                setError("Unable to load dashboard.");
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <section className="py-20 text-center">
                <Loader message="Loading dashboard..." />
            </section>
        );
    }

    if (error) {
        return <p className="text-center text-red-600 py-20">{error}</p>;
    }

    return (
        <section className="py-16 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold">Employer Dashboard</h1>
                    <Link to="/employer/jobs/new">
                        <Button>Post a Job</Button>
                    </Link>
                </div>

                <div className="mt-10">
                    <DashboardStats stats={stats} />
                </div>

                <div className="flex gap-4 mt-10">
                    <Link to="/employer/jobs" className="text-blue-600 font-semibold hover:text-blue-700">Manage My Jobs</Link>
                    <Link to="/employer/profile" className="text-blue-600 font-semibold hover:text-blue-700">Company Profile</Link>
                </div>
            </div>
        </section>
    );
}

export default EmployerDashboardPage;