// utils/mailer.js
import nodemailer from 'nodemailer'


console.log(process.env.EMAIL_USER)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER ,
        pass: process.env.EMAIL_PASS 
    },
});


const sendMail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully")
    } catch (e) {
        console.log("error", e)

    };
}

export default sendMail
