const nodemailer = require('nodemailer');
const expressAsyncHandler = require('express-async-handler');

const sendMail = expressAsyncHandler(async (req, res) => {
    const { to, subject, text } = req.body;


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
        subject : subject,
        text : text
    };
    
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    

})



module.exports = sendMail;