const jwt = require('jsonwebtoken');
const sgMail = require("@sendgrid/mail");
const dotenv = require('dotenv');
dotenv.config();

sgMail.setApiKey(process.env.API_KEY);

const template = process.env.TEMPLATE_ID;

function sendEmail(data){
    var success = false
    var msg = {
        to: data.receiver,
        from: data.sender,
        templateId: template,

        dynamic_template_data: {
            url: data.url,
        }
    };

    sgMail.send(msg, (error, result) => {
        if(error){
            success = false;
            console.log(error);
        } else {
            success = true;
            console.log("Email Sent!");
        }
    });   
    return success;
}

exports.sendEmail = sendEmail;