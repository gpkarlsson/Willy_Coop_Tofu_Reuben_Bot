const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

const dotenv = require('dotenv');
const nodeMailer = require('nodemailer');

const personalEmail = process.env.PERSONAL_EMAIL;
const emailPassword = process.env.EMAIL_PASSWORD;
const coopEmail = COOP_EMAIL;



app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
});

const tofuReubenMsg = 'Hello, \n \tI used to get the Tofu Reuben from your Sandwich Bar and recently have been craving it! Sadly, it seems that the Sandwich Bar is now permanently closed at all of your locations. I am very disappointed by this! Please bring back the sandwich bar, I really miss your tofu Reubens! Reuben sandwiches are my favorite food and since I became a vegetarian, I have very much missed eating reubens! Your tofu reuben was the only thing I ever found that satisfied my cravings, I really hope you will bring them back soon! \n \t Hungrily, \n \n George McKenzie';

let sendTofuEmail = {
  from: personalEmail,
  to: coopEmail, 
  subject: 'Please bring back the Tofu Reubens!',
  text: tofuReubenMsg
};

let transporter = nodeMailer.createTransport({
  service: 'zoho',
  port: 587,
  secure: false,
  auth: {
    user: personalEmail,
    pass: emailPassword
  }
});

transporter.verify((error) => {
  error ? console.log(`There was an error for the email connection: ${error}`) : console.log('Ready to send e-mail');
});

async function newTofuReubenMsg() {
  let info = await transporter.sendMail(sendTofuEmail)
  console.log(`Message send: ${info.messageId}`)
}

newTofuReubenMsg().catch(console.error);


