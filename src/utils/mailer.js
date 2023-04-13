const nodemailer = require ('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user:'andreechiquis11@gmail.com',
        pass: 'zvoldcrcxpcjxtpm'
    }
});

module.exports= transporter;