const jwt = require('jsonwebtoken');
const sgMail = require("@sendgrid/mail");
const dotenv = require('dotenv');
dotenv.config();

sgMail.setApiKey(process.env.API_KEY);

template = process.env.TEMPLATE_ID;

function sendEmail(data){
    var response = 200
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
            response = 400
        } else {
            console.log("Email Sent!")
            response = 200
        }
    })
    return response;
    
}

exports.sendEmail = sendEmail;