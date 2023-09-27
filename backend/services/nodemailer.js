var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 456,
    host: "smtp.gmail.com",
    auth: {
        user: 'eghoiazibapu@gmail.com',
        pass: 'Black177#'
    },
    secure: true,
});

const mailData = {
    from: 'eghoiazibapu@gmail.com',
    to: 'reciever@gmail.com',
    subject: 'Verify Your Email',
    text: 'Click on the Link to Verify Your Email',
    html: '<div style={{display:flex, flex-direction:column}}><h1>Verify your Email<h1/><button style={{padding:5px, background-color:blue, color:white}}>Verify<button/><div/>'
}

// transporter.sendMail(mailData, (error, info) => {
//     // const {to} = req.body;
//     if (error) {
//         return console.log(error);
//     }
//     res.status(200).send({ message: "Mail Sent", message_id: info.messageId })

// });

module.exports = transporter;