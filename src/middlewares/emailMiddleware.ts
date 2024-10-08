import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "davincitestes@gmail.com",
        pass: "jyuysedeghrphcpp"
    }
});

const sendVerificationEmail = async (email:string) =>{
    const mailOptions = {
        from: 'davincitestes@gmail.com',
        to: email,
        subject: 'Verifique sua conta',
        text: `Clique no link para verificar sua conta: `
    };
    const transportado = transporter.sendMail(mailOptions);   
    if(await transportado){
        return true
    }else{
        return false
    }
    
}

export default sendVerificationEmail;