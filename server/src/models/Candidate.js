import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        phoneNumber: {
            type: String,
            trim: true,
            default: ""
        },

        address: {
            type: String,
            trim: true,
            default: ""
        },

        city: {
            type: String,
            trim: true,
            default: ""
        },

        state: {
            type: String,
            trim: true,
            default: ""
        },

        country: {
            type: String,
            trim: true,
            default: ""
        },

        highestQualification: {
            type: String,
            trim: true,
            default: ""
        },

        passingYear: {
            type: Number
        },

        college: {
            type: String,
            trim: true,
            default: ""
        },

        university: {
            type: String,
            trim: true,
            default: ""
        },

        branch: {
            type: String,
            trim: true,
            default: ""
        },

        cgpa: {
            type: Number
        },

        experience: {
            type: Number,
            default: 0
        },

        skills: [{
            type: String,
            trim: true
        }],

        linkedin: {
            type: String,
            default: ""
        },

        github: {
            type: String,
            default: ""
        },

        portfolio: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;