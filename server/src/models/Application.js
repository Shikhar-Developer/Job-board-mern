import mongoose from "mongoose";

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
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: ["PENDING", "ACCEPTED", "REJECTED"],
            default: "PENDING"
        }
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