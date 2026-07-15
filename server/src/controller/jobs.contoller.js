import Job from "../models/Jobs.js"


export const getAllJobs = async (req, res) => {
    //Gives back a arraylist of jobs.
    const { search, location, employmentType, page, limit, sort } = req.query;
    let filter = {};
    if (search?.trim())
        filter.$or = [
            { title: { $regex: search.trim(), $options: "i" } },
            { company: { $regex: search.trim(), $options: "i" } }
        ];

    if (location?.trim()) {
        filter.location = {
            $regex: location.trim(),
            $options: "i"
        };
    }

    if (employmentType?.trim()) {
        filter.employmentType = {
            $regex: employmentType.trim(),
            $options: "i"
        };
    }

    let sortOptions = {};
    switch (sort) {
        case "oldest":
            sortOptions = {
                createdAt: 1
            }
            break;

        case "newest":
        default:
            sortOptions = {
                createdAt: -1
            }
    }

    try {
        const pageNumber = Number(page);
        const pageSize = Number(limit);

        const skip = (pageNumber - 1) * pageSize;
        const totalJobs = await Job.countDocuments(filter);
        const jobs = await Job.find(filter).sort(sortOptions).skip(skip).limit(limit);
        res.status(200).json(
            {
                success: true,
                page: pageNumber,
                limit: pageSize,
                totalPages: Math.ceil(totalJobs / pageSize),
                count: jobs.length,
                data: jobs
            }
        )
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


};

export const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
        if (!job) {
            return res.status(404).json({
                success: true,
                message: "No user is found"
            })
        }
        if (job.createdBy.toString() != req.user._id.toString()) {
            return res.status(403).json({
                success: true,
                message: "Access Denied"
            })
        }
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after", runValidators: true })
        res.status(200).json({
            success: true,
            message: "Job Updated Succesfully!",
            data: job
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server is Down!"
        })
    }
}

export const findJobByID = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(400).json({
                success: false,
                message: "No Job Found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Job Found",
            data: job
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

export const createJob = async (req, res) => {
    try {
        const job = await Job.create({
            ...req.body,
            createdBy: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Job Created",
            data: job
        })
    } catch (error) {
        if (error.name == "ValidationError") {
            const errors = Object.values(error.errors).map(
                (err) => ({
                    field: err.path,
                    message: err.message
                })
            );

            return res.status(400).json({
                success: false,
                message: "Validation Failed",
                errors
            })
        }
        res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
};

export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            })
        }
        if (req.user._id.toString() != job.createdBy.toString()) {
            return res.status(403).json({
                success: true,
                message: "Access Denied"
            })
        }
        const deletedJob = await Job.findByIdAndDelete(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "Job deleted Succesfully",
            data: deletedJob
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}