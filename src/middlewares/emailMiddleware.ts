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

const sendPasswordResetEmail = async (email: string, resetLink: string) => {
    const mailOptions = {
        from: 'davincitestes@gmail.com',
        to: email,
        subject: 'Redefinição de Senha',
        html: `Clique no link para redefinir sua senha: <a href="${resetLink}">${resetLink}</a>`
    };

    const transportado = await transporter.sendMail(mailOptions);
    return !!transportado;
}

export { sendPasswordResetEmail };