const express = require('express');
const jwt = require('jsonwebtoken');
var sender = require("./tokenSender");
const client = require('@sendgrid/client');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();

client.setApiKey(process.env.API_KEY)
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;
const SENDER = process.env.SENDER
const TEMPLATE_SIGN_UP_SUCCESS = process.env.TEMPLATE_SIGN_UP_SUCCESS;


app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));

var tokens = jwt.sign({
    data: 'Token Data'
}, SECRET_KEY, { expiresIn: '24h' }  
);    

app.get("/", (req, res) => res.send("API Called."));

app.get('/verify/:token&:first_name&:last_name&:email&:country', async (req, res) => {
    const token = req.params.token;
    var emailUser = req.params.email;
    const data = {
        "contacts": [
            {
                "first_name": req.params.first_name,
                "last_name": req.params.last_name,
                "email": emailUser,
                "country": req.params.country,
            }
        ]
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const request = {
            url: "https://api.sendgrid.com/v3/marketing/contacts",
            method: 'PUT',
            body: data
        };

        const response = await client.request(request);
        console.log("Response status code:", response.statusCode);
        console.log("Response body:", response.body);

    } catch (error) {
        console.log("Error adding email to SendGrid:", error);
    }

    try{
        const data_email_success = {
            "from": {
                "email": SENDER
            },
            "personalizations": [
                {
                    "to": [
                        {
                            "email": emailUser
                        }
                    ],
                }
            ],
            "template_id": TEMPLATE_SIGN_UP_SUCCESS
        };

        const req_success_email = {
            url: "https://api.sendgrid.com/v3/mail/send",
            method: 'POST',
            body: data_email_success
        }

        const email_welcome = await client.request(req_success_email);
        console.log("Response status code:", email_welcome.statusCode);
        console.log("Response body:", email_welcome.body);
        res.send("Email Verified Successfully!")
    } catch (error) {
        console.log("Error adding email to SendGrid:", error);
        res.send("Error adding email to SendGrid");
    }
});

app.post('/sendEmail', async (req, res) => {
    const body = req.body
    console.log(body)
    var first_name = body.first_name;
    var last_name = body.last_name;
    var email_receiver = body.email;
    var country = body.country;
    var data = {
        first_name: first_name,
        last_name: last_name,
        sender: SENDER,
        receiver: email_receiver,
        url: req.hostname + "/verify/"+tokens+"&"+first_name+"&"+last_name+"&"+email_receiver+"&"+country
    }
    
    // for local only
    // sender.sendEmail(data, (error) => {
    //     if (error) {
    //         console.error(error);
    //         res.status(500).json({ success: false, message: 'Error sending email' });
    //     } else {
    //         console.log("Email Sent!");
    //         res.status(200).json({ success: true, message: 'Email sent successfully' });
    //     }
    // });

    // for production only
    try {
        const emailResult = await sender.sendEmail(data);
        if (emailResult.success) {
            res.status(200).json({ message: 'Email sent successfully' });
        } else {
            res.status(500).json({ message: 'Error sending email' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);


module.exports = app;