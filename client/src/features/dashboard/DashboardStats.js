// client/src/features/dashboard/DashboardStats.jsx
const DashboardStats = ({ stats }) => {
    const cards = [
        { label: "Total Jobs", value: stats.totalJobs, color: "text-blue-600" },
        { label: "Total Applications", value: stats.totalApplications, color: "text-slate-700" },
        { label: "Pending", value: stats.pendingApplications, color: "text-yellow-600" },
        { label: "Accepted", value: stats.acceptedApplications, color: "text-green-600" },
        { label: "Rejected", value: stats.rejectedApplications, color: "text-red-600" }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {cards.map((card) => (
                <div key={card.label} className="bg-white rounded-xl shadow-sm p-6 text-center">
                    <p className={`text-4xl font-bold ${card.color}`}>{card.value}</p>
                    <p className="text-gray-600 mt-2">{card.label}</p>
                </div>
            ))}
        </div>
    );
}

export default DashboardStats;