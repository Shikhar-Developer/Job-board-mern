// client/src/pages/JobApplicants/JobApplicantsPage.jsx
import JobApplicants from "../../features/applications/JobApplicants";

const JobApplicantsPage = () => {
    return (
        <section className="py-16 bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-center">Applicants</h1>
                <div className="mt-10">
                    <JobApplicants />
                </div>
            </div>
        </section>
    )
}

export default JobApplicantsPage;