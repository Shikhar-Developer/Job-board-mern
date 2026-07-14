import Job from "../models/Jobs.js"


export const getAllJobs = async (req, res) => {
    //Gives back a arraylist of jobs.
    const jobs = await Job.find()
    res.json(
        {
            success: true,
            data: jobs
        }
    )

};

export const updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after", runValidators: true })
        if (!job) {
            return res.status(404).json({
                success: true,
                message: "No user is found"
            })
        }
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
        const job = await Job.create(req.body);
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