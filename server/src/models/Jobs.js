import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        company: {
            type: String,
            required: true,
            trim: true
        },

        location: {
            type: String,
            required: true,
            trim: true
        },

        employmentType: {
            type: String,
            required: true,
            enum: ["Full-Time", "Part-Time", "Internship", "Contract"]
        },

        salary: {
            type: Number
        },

        description: {
            type: String,
            required: true
        },

        requirements: [
            {
                type: String
            }
        ],

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
