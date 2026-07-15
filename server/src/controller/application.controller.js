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

export const getMyApplication = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const pageNumber = Number(page);
        const pageSize = Number(limit)
        const skip = (pageNumber - 1) * pageSize

        const totalPages = await Application.countDocuments({ candidate: req.user._id });
        const applications = await Application.find({ candidate: req.user._id }).sort({ createdAt: -1 }).skip(skip).limit(pageSize).populate({
            path: "job",
            select: "title company location salary employmentType",
        });

        res.status(200).json({
            success: true,
            message: "Job Applications found",
            page: pageNumber,
            limit: pageSize,
            totalPages: totalPages,
            data: applications
        });

    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message || "Internal Server Error"
        })
    }
}