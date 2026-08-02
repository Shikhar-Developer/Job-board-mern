// client/src/pages/MyJobs/MyJobsPage.jsx
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button.jsx";
import MyJobsList from "../../features/jobs/MyJobsList";

const MyJobsPage = () => {
    return (
        <section className="py-16 bg-slate-50 min-h-screen">
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-4xl font-bold">My Jobs</h1>
                    <Link to="/employer/jobs/new">
                        <Button>Post a Job</Button>
                    </Link>
                </div>
                <div className="mt-10">
                    <MyJobsList />
                </div>
            </div>
        </section>
    )
}

export default MyJobsPage;