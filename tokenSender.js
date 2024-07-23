const jwt = require('jsonwebtoken');
const sgMail = require("@sendgrid/mail");
const dotenv = require('dotenv');
dotenv.config();

sgMail.setApiKey(process.env.API_KEY);

const TEMPLATE = process.env.TEMPLATE_ID;
const TEMPLATE_SIGN_UP_SUCCESS = process.env.TEMPLATE_SIGN_UP_SUCCESS;

async function sendEmail(data){
    var msg = {
        to: data.receiver,
        from: data.sender,
        templateId: TEMPLATE,

        dynamic_template_data: {
            url: data.url,
        }
    }; 

    try {
        await sgMail.send(msg);
        console.log("Email Sent!");
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error(error);
        return { success: false, message: "There is error while sending email" };
    }
}

async function sendEmailSuccess(data){
    var msg = {
        to: data.receiver,
        from: data.sender,
        templateId: TEMPLATE_SIGN_UP_SUCCESS
    };

    try {
        await sgMail.send(msg);
        console.log("Email Sent!");
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error(error);
        return { success: false, message: "There is error while sending email" };
    }
}

exports.sendEmailSuccess = sendEmailSuccess;
exports.sendEmail = sendEmail;