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

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));

var tokens = jwt.sign({
    data: 'Token Data'
}, SECRET_KEY, { expiresIn: '24h' }  
);    

app.get("/", (req, res) => res.send("Express on Vercel"));

app.get('/verify/:token&:email&:country', (req, res) => {
    const token = req.params.token;

    const data = {
        "contacts": [
            {
                "email": req.params.email,
                "country": req.params.country,
            }
        ]
    }
    const request = {
        url: "https://api.sendgrid.com/v3/marketing/contacts",
        method: 'PUT',
        body: data
    }

    jwt.verify(token, SECRET_KEY, function(err, decoded){
        if(err){
            console.log(err);
            console.log(token);
            res.send("Email Verification failed. Invalid or Expired");
        } else{
            res.send("Email verified succesfully")
            client.request(request).then(([response, body])=>{
                console.log(response.statusCode);
                console.log(response.body)
            }).catch(error=> {console.log(error)});
        }
    })
});

app.post('/sendEmail', (req, res) => {
    const body = req.body
    console.log(body)
    var email_receiver = body.email;
    var country = body.country;
    var data = {
        sender: SENDER,
        receiver: email_receiver,
        url:"https://email-api-litewallet.vercel.app/verify/"+tokens+"&"+email_receiver+"&"+country
    }
    
    var response = sender.sendEmail(data);
    if(response == 400){
        res.json({
            code: response,
            message: "Bad Request"
        })
    }else{
        res.json({
            code: response,
            message: "Email Sent!"
        })
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