import Employer from "../models/Employer.js";
import User from "../models/User.js";

export const getEmployerProfile = async (req, res) => {

    try {

        const employer = await Employer.findOne({
            user: req.user._id
        }).populate({
            path: "user",
            select: "name email role"
        });

        if (!employer) {

            return res.status(404).json({
                success: false,
                message: "Employer profile not found."
            });

        }

        res.status(200).json({
            success: true,
            data: employer
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const updateEmployerProfile = async (req, res) => {

    try {

        const {
            name,
            companyName,
            designation,
            companyEmail,
            companyWebsite,
            companyAddress,
            phoneNumber
        } = req.body;

        if (name) {

            await User.findByIdAndUpdate(
                req.user._id,
                { name },
                { runValidators: true }
            );

        }

        const employer = await Employer.findOneAndUpdate(

            {
                user: req.user._id
            },

            {
                companyName,
                designation,
                companyEmail,
                companyWebsite,
                companyAddress,
                phoneNumber
            },

            {
                new: true,
                runValidators: true
            }

        ).populate({
            path: "user",
            select: "name email role"
        });

        res.status(200).json({

            success: true,

            message: "Employer profile updated successfully.",

            data: employer

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};