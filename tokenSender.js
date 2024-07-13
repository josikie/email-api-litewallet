const jwt = require('jsonwebtoken');
const sgMail = require("@sendgrid/mail");
const dotenv = require('dotenv');
dotenv.config();

sgMail.setApiKey(process.env.API_KEY);

const template = process.env.TEMPLATE_ID;

async function sendEmail(data){
    var msg = {
        to: data.receiver,
        from: data.sender,
        templateId: template,

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
        return { success: false, message: "Error sending email" };
    }
}

exports.sendEmail = sendEmail;