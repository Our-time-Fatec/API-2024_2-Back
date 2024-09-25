import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

const sendVerificationEmail = async (email:string, verificationLink:string) =>{
    const mailOptions = {
        from: 'lucasrobertoo727@gmail.com',
        to: `${email}`,
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