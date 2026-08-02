import Candidate from "../models/Candidate.js"

export const getCandidateProfile = async (req, res) => {
    try {
        const candidate = await Candidate.findOne({ user: req.user._id }).populate({ path: "user", select: "name email role" });
        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: "Candidate Not found!"
            })
        }

        const fields = [
            candidate.phoneNumber, candidate.address, candidate.city,
            candidate.state, candidate.country, candidate.highestQualification,
            candidate.passingYear, candidate.college, candidate.university,
            candidate.branch, candidate.cgpa, candidate.experience,
            candidate.linkedin, candidate.github, candidate.portfolio
        ];

        let filledCount = 0;
        fields.forEach(value => {
            if (value !== undefined && value !== null && value !== "") {
                filledCount++;
            }
        });

        if (candidate.skills && candidate.skills.length > 0) {
            filledCount++;
        }

        const totalFields = 16;
        const completionPercentage = (filledCount / totalFields) * 100;

        const profileCompleted = completionPercentage > 80;

        res.status(200).json({
            success: true,
            message: "Candidate found!",
            data: candidate,
            profileCompleted: profileCompleted
        })

    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message || "Internal Server Error"
        })
    }
}

export const updateCandidateProfile = async (req, res) => {
    try {

        const { name, ...candidateData } = req.body;

        if (name) {
            await User.findByIdAndUpdate(
                req.user._id,
                { name },
                { runValidators: true }
            );
        }

        const candidate = await Candidate.findOneAndUpdate({ user: req.user._id }, candidateData, { new: true, runValidators: true }).populate({ path: "user", select: "name email role" })

        if (!candidate) {
            return res.status(404).json({
                success: true,
                message: "Candidate not found!"
            })
        }

        res.status(200).json({
            success: true,
            message: "Candidate Updated Succesfully",
            data: candidate
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal Server error"
        })
    }
} 