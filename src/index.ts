import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { connect } from "./database/connection";
import seedDatabase from "./database/seed";
import { sendVerificationEmail, sendPasswordResetEmail } from "./middlewares/emailMiddleware";

// Carregar as variáveis de ambiente
dotenv.config();

// Será usada a porta 3000 se a variável de ambiente PORT não for definida
const PORT = process.env.PORT || 3000;

const app = express();

// Configuração para suportar JSON no body das requisições
app.use(express.json());

// Configurar o CORS para permitir requisições de qualquer origem
app.use(cors());

// Envia o email para verificação do email
app.post('/send-verification-email', async (req, res) => {
    const { email } = req.body;

    const success = await sendVerificationEmail(email);
    
    if (success) {
        res.status(200).json({ message: 'Email sent successfully' });
    } else {
        res.status(500).json({ message: 'Failed to send email' });
    }
});

// Envia o email para o reset da senha
app.post('/send-reset-pass', async (req, res) => {
    const { email } = req.body;

    const success = await sendPasswordResetEmail(email);
    
    if (success) {
        res.status(200).json({ message: 'Email sent successfully' });
    } else {
        res.status(500).json({ message: 'Failed to send email' });
    }
});

// Função para iniciar o servidor após conexão com o banco e seeding
async function startServer() {
    try {
        // Conectando ao MongoDB
        await connect();
        console.log("Conectado ao MongoDB com sucesso!");

        // Realizando o seed do banco de dados
        await seedDatabase();
        console.log("Banco de dados seedado com sucesso!");

        // Inicializa o servidor na porta especificada
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}...`);
        });

        // Define as rotas após o seeding e a conexão
        app.use(routes);

    } catch (error) {
        console.error("Erro ao iniciar a aplicação:", error);
    }
}

// Iniciar o servidor
startServer();
