import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendVerificationEmail = async (email:string, verificationLink:string) =>{
    const mailOptions = {
        from: 'lucas.robertonascimento@hotmail.com',
        to: email,
        subject: 'Verifique sua conta',
        text: `Clique no link para verificar sua conta: ${verificationLink}`
    };
    const transportado = transporter.sendMail(mailOptions);   
    if(await transportado){
        return true
    }else{
        return false
    }
    
}

export default sendVerificationEmail;