const nodemailer = require('nodemailer');
const expressAsyncHandler = require('express-async-handler');

const sendMail = async ({ to, subject, text }) => {
    try {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: process.env.ACCESS_TOKEN,
        }
    });

    let mailOptions = {
        from: process.env.EMAIL,
        to : to,
        subject,
        text,
    };


        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return { success: true, message: 'Email sent: ' + info.response };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error sending email' };
    }
};



module.exports = sendMail;