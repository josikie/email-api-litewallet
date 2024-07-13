const jwt = require('jsonwebtoken');
const sgMail = require("@sendgrid/mail");
const dotenv = require('dotenv');
dotenv.config();

sgMail.setApiKey(process.env.API_KEY);

const template = process.env.TEMPLATE_ID;

function sendEmail(data){
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
            console.log(error)
            return false
        } else {
            console.log("Email Sent!")
            return true
        }
    })   
}

exports.sendEmail = sendEmail;