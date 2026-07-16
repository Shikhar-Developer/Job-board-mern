import Application from "../models/Application.js";
import Candidate from "../models/Candidate.js";
import Job from "../models/Jobs.js"
import { applicationCreated, sendApplicationAcceptedEmail, sendApplicationRejectedEmail } from "../service/email.service.js";

export const applyForJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const candidate = await Candidate.findOne({ user: req.user._id });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            })
        }

        const candidateId = candidate._id;
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
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume is required."
            });
        }

        //Create Application
        const application = await Application.create({
            job: jobId,
            candidate: candidateId,
            resume: req.file.path,
            message: req.body.message || "",

            applicationDetails: {
                name: req.body.name,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                highestQualification: req.body.highestQualification,
                passingYear: req.body.passingYear,
                college: req.body.college,
                university: req.body.university,
                branch: req.body.branch,
                cgpa: req.body.cgpa,
                experience: req.body.experience,
                skills: req.body.skills ? req.body.skills.split(",").map(skill => skill.trim()).filter(Boolean) : []
            }

        });

        //Email
        await applicationCreated(req.body.email, req.body.name, req.body.title, req.body.company)

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

        const candidate = await Candidate.findOne({ user: req.user_id });
        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate not found!"
            })
        }

        const candidateId = candidate._id


        const totalPages = await Application.countDocuments({ candidate: candidateId });
        const applications = await Application.find({ candidate: candidateId }).sort({ createdAt: -1 }).skip(skip).limit(pageSize).populate({
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

export const getAllJobApplicants = async (req, res) => {
    try {
        const { jobId } = req.params;
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found!"
            })
        }

        //Ownership Check
        if (job.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: true,
                message: "Access Denied!"
            })
        }

        const application = await Application.find({
            job: jobId
        }).populate({
            path: "candidate",
            populate: { path: "user", select: "name email" }
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "All Applications fetched",
            count: application.length,
            data: application
        })

    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message || "Internal Server Error"
        })
    }
}

export const acceptApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const application = await Application.findById(applicationId).populate("job");
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application Not Found!"
            })
        }

        if (application.job.createdBy.toString() != req.user._id.toString()) {
            return res.status(403).json({
                success: true,
                message: "Access Denied"
            })
        }

        if (application.status != "PENDING") {
            return res.status(400).json({
                success: false,
                message: "Application already proccessed!"
            })
        }

        application.status = "ACCEPTED"
        await application.save();

        //Email Accepted
        await sendApplicationAcceptedEmail(application.applicationDetails.email, application.applicationDetails.name, application.applicationDetails.title, application.applicationDetails.company);


        res.status(200).json({
            success: true,
            message: "Accepted Succesfully!",
            data: application
        })

    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message || "Internal Server Error"
        })
    }
}

export const rejectApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const application = await Application.findById(applicationId).populate("job");
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application Not Found!"
            })
        }

        if (application.job.createdBy.toString() != req.user._id.toString()) {
            return res.status(403).json({
                success: true,
                message: "Access Denied"
            })
        }

        if (application.status != "PENDING") {
            return res.status(400).json({
                success: false,
                message: "Application already proccessed!"
            })
        }

        application.status = "REJECTED"
        await application.save();

        //Email Rejected
        await sendApplicationRejectedEmail(application.applicationDetails.email, application.applicationDetails.name, application.applicationDetails.title, application.applicationDetails.company);

        res.status(200).json({
            success: true,
            message: "Rejected Succesfully!",
            data: application
        })

    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message || "Internal Server Error"
        })
    }
}


export const withdrawApplication = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const application = await Application.findById(applicationId);
        if (!application) {
            return res, status(404).json({
                success: false,
                message: "Application not found!"
            })
        }

        const candidate = await Candidate.findOne({ user: req.user._id });

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate profile not found."
            });
        }

        if (application.candidate.toString() !== req.candidate._id) {
            return res.status(403).json({
                success: true,
                message: "Access Denied"
            })
        }

        if (application.status != "PENDING") {
            return res.status(400).json({
                success: false,
                message: "Application in process!"
            })
        }

        await application.deleteOne();

        res.staus(200).json({
            success: true,
            message: "Application Withdrawn Successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error"
        })
    }
}