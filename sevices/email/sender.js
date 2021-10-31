const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
require('dotenv').config();

class CreateSenderSendGrid {
    async send(msg) {
        sgMail.setApiKey(process.env.SENGRID_API_KEY);
        // return await sgMail.send({ ...msg, from: 'krabat@ex.ua' });
        return await sgMail.send({ ...msg, from: process.env.SENGRID_EMAIL });
    }
};

class CreateSenderNodemailer {
    async send(msg) {
        const config = {
            host: 'smtp.meta.ua',
            port: 465,
            secure: true,
            auth: {
            //   user: 'goitnodejs@meta.ua',
              user: process.env.NODEMAILER_EMAIL,
              pass: process.env.PASSWORD,
            },
        }
        const transporter = nodemailer.createTransport(config);
        return await transporter.sendMail({ ...msg, from: process.env.NODEMAILER_EMAIL })
    }
};

module.exports = {
    CreateSenderSendGrid,
    CreateSenderNodemailer,
};