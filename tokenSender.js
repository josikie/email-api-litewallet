const jwt = require('jsonwebtoken');
const sgMail = require("@sendgrid/mail");
const dotenv = require('dotenv');
dotenv.config();

sgMail.setApiKey(process.env.API_KEY);

const template = process.env.TEMPLATE_ID;

function sendEmail(data){
    var msg = ""
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
            msg = error
        } else {
            msg = "Email Already Sent!"
            console.log("Email Sent!");
        }
    });   
    return msg;
}

exports.sendEmail = sendEmail;