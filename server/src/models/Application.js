import mongoose from "mongoose";

const applicationDetailsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        phoneNumber: String,
        address: String,
        city: String,
        state: String,
        country: String,
        highestQualification: String,
        passingYear: Number,
        college: String,
        university: String,
        branch: String,
        cgpa: Number,
        experience: Number,
        skills: [{ type: String }]
    },
    {
        _id: false
    }
);


// Class Schema of mongoose Library
const ApplicationSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
            required: true
        },

        candidate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Candidate",
            required: true
        },

        resume: {
            type: String,
            required: true
        },

        message: {
            type: String,
            trim: true,
            maxlength: 1000,
            default: ""
        },

        status: {
            type: String,
            enum: ["PENDING", "ACCEPTED", "REJECTED"],
            default: "PENDING"
        },

        applicationDetails: applicationDetailsSchema
    },
    {
        timestamps: true
    }

);

ApplicationSchema.index({
    job: 1,
    candidate: 1
},
    {
        unique: true
    }
);

const Application = mongoose.model("Application", ApplicationSchema);
export default Application;