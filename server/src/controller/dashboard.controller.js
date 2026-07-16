import Application from "../models/Application.js";
import Job from "../models/Jobs.js"

export const getEmployeeDashboard = async (req, res) => {
    try {
        const jobs = await Job.find({ createdBy: req.user._id });
        const jobIds = jobs.map((job) => job._id);
        const applications = await Application.find({ job: { $in: jobIds } });

        const pendingApplications = applications.filter((application) => application.status === "PENDING").length;
        const acceptedApplications = applications.filter(application => application.status === "ACCEPTED").length;
        const rejectedApplications = applications.filter(application => application.status === "REJECTED").length;

        res.status(200).json({
            success: true,
            message: "DashBoard Statics Loaded Succesfully",
            data: {
                totalJobs: jobs.length,
                totalApplications: applications.length,
                pendingApplications,
                acceptedApplications,
                rejectedApplications
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}