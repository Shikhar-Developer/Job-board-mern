export const getAllJobs = (req, res) => {
    res.json(
        {
            success: true,
            message: "All Jobs are loaded",
            jobs: []
        }
    )

};