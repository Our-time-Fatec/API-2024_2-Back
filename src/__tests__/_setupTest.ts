import request from "supertest";
import app from "../index";
import mongoose from 'mongoose';

require('dotenv').config({ path: '.env.dev' });

export const connectTestDB = async () => {
  const mongoUri = process.env.DB_URI;
  if (!mongoUri) {
    throw new Error('A variável de ambiente DB_URI não está definida');
  }

  await mongoose.connect(mongoUri);

  // Verifica se o usuário já existe antes de criar um novo
  const existingUser = await mongoose.model('Usuario').findOne({ email: "sales@gmail.com" });
  if (!existingUser) {
    await request(app).post('/usuario').send({
      nome: "André",
      sobrenome: "Sales",
      email: "sales@gmail.com",
      senha: "123123",
      dataDeNascimento: "2005-06-27T12:30:00Z",
      peso: 50,
      altura: 170,
      nivelDeSedentarismo: "Levemente ativo",
      sexo: "Masculino",
      objetivo: "Dieta de Ganho de Massa Muscular"
    });
  }
};

export const createAndLogin = async ():Promise<string> => {
  const existingUser = await mongoose.model('Usuario').findOne({ email: "lucas@gmail.com" });
  if (!existingUser) {
    await request(app).post('/usuario').send({
      nome: "Lucas",
      sobrenome: "Roberto",
      email: "roberto@gmail.com",
      senha: "123123",
      dataDeNascimento: "2002-06-27T12:30:00Z",
      peso: 60,
      altura: 175,
      nivelDeSedentarismo: "Levemente ativo",
      sexo: "Masculino",
      objetivo: "Dieta de Ganho de Massa Muscular"
    });
  }
  const loginResponse = await request(app).post("/auth/login").send({
    email: "roberto@gmail.com",
    senha: "123123",
  });

  

  const authToken = loginResponse.body.token;
  return authToken
}

export const disconnectTestDB = async () => {
  await mongoose.connection.dropDatabase(); // Remove os dados de teste
  // await new Promise(resolve => setTimeout(resolve, 1000)); // Aguarda um segundo
  await mongoose.disconnect(); // Desconecta o mongoose
};
