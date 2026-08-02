// client/src/pages/MyApplications/MyApplicationsPage.jsx
import MyApplicationsList from "../../features/applications/MyApplicationsList";

const MyApplicationsPage = () => {
    return (
        <section className="py-16 bg-slate-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-center">My Applications</h1>
                <div className="mt-10">
                    <MyApplicationsList />
                </div>
            </div>
        </section>
    )
}

export default MyApplicationsPage;