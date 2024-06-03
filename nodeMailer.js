const nodemailer = require('nodemailer');
const randomData = require('./utils/random')

// create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'daron.wisozk@ethereal.email',
      pass: '5OyV?8pbF_BsKB@r'
      }
});
const generatedPasskey = randomData.randomPasskey(8);
console.log(generatedPasskey);
// specify the email details
let mailOptions = {
  from: 'daron.wisozk@ethereal.email',
  to: 'nil.2023@yopmail.com',
  subject: 'Hello! from Node JS, Your Passkey',
  html: `<h4>This is your Passkey :</h4> 
        <h3>${generatedPasskey}</h3> `
};

// send the email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

module.exports = {
  generatedPasskey : generatedPasskey
}