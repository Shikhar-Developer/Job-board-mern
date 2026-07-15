import Application from "../models/Application.js";
import Job from "../models/Jobs.js"

export const applyForJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const candidateId = req.user._id;

        //Check if job Exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            })
        }

        //Check for duplicate Application
        const existingApplication = await Application.findOne({ candidate: candidateId, job: jobId });
        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job!"
            })
        }

        //Create Application
        const application = await Application.create({
            job: jobId,
            candidate: candidateId
        })

        res.status(201).json({
            success: true,
            message: "Application Created",
            data: application
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }


}