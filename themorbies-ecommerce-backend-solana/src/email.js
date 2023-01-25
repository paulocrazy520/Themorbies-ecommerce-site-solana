const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: "<user>",
        pass: "<pass>"
    }
})

message = {
    from: "from-example@email.com",
    to: "to-example@email.com",
    subject: "Subject",
    text: "Hello SMTP Email"
}

export const sendMail = (message) => {
    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
}