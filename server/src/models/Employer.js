import mongoose from "mongoose";

const employerSchema = new mongoose.Schema(
    {

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        companyName: {
            type: String,
            default: ""
        },

        designation: {
            type: String,
            default: ""
        },

        companyEmail: {
            type: String,
            default: ""
        },

        companyWebsite: {
            type: String,
            default: ""
        },

        companyAddress: {
            type: String,
            default: ""
        },

        phoneNumber: {
            type: String,
            default: ""
        }

    },
    {
        timestamps: true
    }
);

const Employer = mongoose.model("Employer", employerSchema);

export default Employer;