import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
    // Read the exact variables your .env file uses
    const senderEmail = process.env.PORTAL_EMAIL;
    const senderPassword = process.env.PORTAL_EMAIL_PASSWORD;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: senderEmail,
            pass: senderPassword
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        const info = await transporter.sendMail({
            from: `"Job Portal" <${senderEmail}>`,
            to,
            subject,
            html
        });

    } catch (error) {
        console.error("Email Delivery Failed! Error Details:", error.message);
    }
};

export const registrationCompletedEmail = async (to) => {
    try {
        await sendEmail({
            to,
            subject: "Registration Successful",
            html: `
                <h1>Registration Succesfull</h1>

                <p>Thank you for registering we look forward to more engagement</p>

                <p>
                    Regards <br>
                    Owen GrassGoff
                </p>
            `
        });
    } catch (error) {
        console.log(error.message);
    }

};

export const sendApplicationAcceptedEmail = async (to, name, jobTitle, company) => {
    try {
        await sendEmail({
            to,
            subject: "Application Update",
            html: `
                <h2>Hello ${name}</h2>
                <p>Thank you for applying for<b>${jobTitle}</b>at<b>${company}</b></p>
                <p>Your application was selected and the employer will contact you soon.</p>
                <p>We wish you success in your future applications.</p>

                <p>
                    Regards <br>
                    Owen GrassGoff
                </p>
            `
        });
    } catch (error) {
        console.log(error.message);
    }

};

export const sendApplicationRejectedEmail = async (to, name, jobTitle, company) => {
    try {
        await sendEmail({
            to,
            subject: "Application Update",
            html: `
                <h2>Hello ${name}</h2>
                <p>Thank you for applying for<b>${jobTitle}</b>at<b>${company}</b></p>
                <p>Unfortunately,your application was not selected.</p>
                <p>We wish you success in your future applications.</p>

                <p>
                    Regards <br>
                    Owen GrassGoff
                </p>
            `
        });
    } catch (error) {
        console.log(error.message);
    }

};


export const applicationCreated = async (to, name, title, company) => {
    try {
        await sendEmail({
            to,
            subject: "Application Submitted Succesfully",
            html: `
                <h1>Your Application has been successfully submitted</h1>

                <p>Hello ${name},</p>
                <p>Your application for <b>${title}</b> at <b>${company}</b> has been submitted successfully.</p>
                <p>Current Status: <b>PENDING</b></p>
                <p>Thank you for applying.</p>

                <p>This email is a result of a succesful creation of an application!</p>
                <p>You will recieve a Confirmation as soon as your application is Accepted</p>

                <p>
                    Regards <br>
                    Owen GrassGoff
                </p>
            `
        })
    } catch (error) {
        console.log("Error Occured: ", error.message);
    }
}