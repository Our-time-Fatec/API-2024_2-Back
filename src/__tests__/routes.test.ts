import request from "supertest";
import app from "../index"; // Aqui você deve importar seu arquivo principal da aplicação
import { connectTestDB, createAndLogin, disconnectTestDB } from "./_setupTest";
import UsuarioFunc from "../func/UsuarioFunc";
import { DiasSemana } from "../enums/DiasSemana";

let usuarioId: string;
let authToken: string;
let generalAuthToken: string;
let alimentoId: string;
let dietaAuthId: string;
let alimentoId1: string;
let alimentoId2: string;
let dietaId: string;
let dietaDiariaId: string;

const hoje = new Date();
const diaDaSemanaHoje = hoje.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
const diaSemanaAtual = Object.values(DiasSemana)[diaDaSemanaHoje];
const diaSemanaAtualKey = Object.keys(DiasSemana)[diaDaSemanaHoje] as keyof typeof DiasSemana;

  // Supondo que isso esteja dentro de um bloco `beforeAll`
  beforeAll(async () => {
    await connectTestDB();

    // jest.useFakeTimers().setSystemTime(new Date('2024-10-19T00:00:00Z'));
  
    const loginResponse = await request(app).post("/auth/login").send({
      email: "sales@gmail.com",
      senha: "123123",
    });
  
    generalAuthToken = loginResponse.body.token;
  });
  
  // Restaurar a implementação original do Date após todos os testes
afterAll(async () => {

  console.log("Deletando banco de dados...");
  await disconnectTestDB();
  console.log("Deletando banco de dados deletado");
});

describe("Routes", () => {
  // Rotas de usuário
  describe("Testando as rotas de Usuário", () => {
    it("Deve criar um usuário com sucesso e medir o tempo de resposta", async () => {
      const start = Date.now(); // Inicia a medição de tempo

      const response = await request(app).post("/usuario").send({
        nome: "André",
        sobrenome: "Sales",
        email: "andre@gmail.com",
        senha: "123123",
        dataDeNascimento: "2005-06-27T12:30:00Z",
        peso: 50,
        altura: 170,
        nivelDeSedentarismo: "Sedentário",
        sexo: "Masculino",
        objetivo: "Dieta de Ganho de Massa Muscular",
      });

      const end = Date.now(); 
      const duration = end - start; 

      expect(duration).toBeLessThan(500); 

      // Valida o conteúdo da resposta
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("usuario");
      expect(response.body.usuario.email).toBe("andre@gmail.com");

      usuarioId = response.body.usuario._id;
    });

    it("Deve falhar ao criar usuário com senha curta", async () => {
      const response = await request(app).post("/usuario").send({
        nome: "Maria",
        sobrenome: "Silva",
        email: "maria.silva@example.com",
        senha: "123",
        dataDeNascimento: "2005-06-27T12:30:00Z",
        peso: 60,
        altura: 165,
        nivelDeSedentarismo: "Sedentário",
        sexo: "Feminino",
        objetivo: "Dieta de Ganho de Massa Muscular",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "A senha precisa ter no mínimo 6 caracteres"
      );
    });

    it("Deve fazer login e retornar um token", async () => {
      const loginResponse = await request(app).post("/auth/login").send({
        email: "andre@gmail.com",
        senha: "123123",
      });

      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body).toHaveProperty("token");

      authToken = loginResponse.body.token;
    });

    it("Deve pegar os detalhes do usuário", async () => {
      const response = await request(app)
        .get("/usuario/me")
        .set("Authorization", `${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(usuarioId);
    });

    it("Deve retornar um erro por não ter token", async () => {
      const response = await request(app).get("/usuario/me");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Token não fornecido");
    });

    it("Deve pegar os detalhes específicos do usuário", async () => {
      const response = await request(app)
        .get("/usuario/mydetails")
        .set("Authorization", `${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(usuarioId);
      expect(response.body).toHaveProperty("totaisAlimentosConsumidos");
    });

    it("Deve atualizar o usuário com sucesso", async () => {
      const response = await request(app)
        .put("/usuario")
        .set("Authorization", `${authToken}`)
        .send({
          nome: "André",
          sobrenome: "Sales",
          peso: 55,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("usuario");
      expect(response.body.usuario.peso).toBe(55);
    });

    it("Deve atualizar o consumo de água do usuario com sucesso", async () => {
      const response = await request(app)
        .put("/usuario/agua")
        .set("Authorization", `${authToken}`)
        .send({
          aguaIngerida: 400,
        });

      expect(response.status).toBe(200);
      expect(response.body.aguaIngerida).toBe(400);
      expect(response.body.message).toBe(
        "Quantia atualizada! Agora você já consumiu 400ml de agua!"
      );
    });

    it("Deve atualizar o consumo de água do usuario com sucesso mesmo com mais de uma requisição", async () => {
      await request(app)
        .put("/usuario/agua")
        .set("Authorization", `${authToken}`)
        .send({
          aguaIngerida: 400,
        });
      const response = await request(app)
        .put("/usuario/agua")
        .set("Authorization", `${authToken}`)
        .send({
          aguaIngerida: 400,
        });

      expect(response.status).toBe(200);
      expect(response.body.aguaIngerida).toBe(1200);
      expect(response.body.message).toBe(
        "Quantia atualizada! Agora você já consumiu 400ml de agua!"
      );
    });

    it("Deve reiniciar o consumo diário do usuario", async () => {
      const response = await request(app)
        .put("/usuario/agua/zerar")
        .set("Authorization", `${authToken}`)
        .send({});

      expect(response.status).toBe(200);
      expect(response.body.aguaIngerida).toBe(0);
      expect(response.body.message).toBe(
        "Quantia atualizada! Agora você já consumiu 0ml de agua!"
      );
    });

    it("Deve sempre manter o máximo de agua ingerida sendo a meta de água", async () => {
      const response = await request(app)
        .put("/usuario/agua")
        .set("Authorization", `${authToken}`)
        .send({
          aguaIngerida: 2000000,
        });

      const loginResponse = await request(app).post("/auth/login").send({
        email: "andre@gmail.com",
        senha: "123123",
      });

      expect(response.status).toBe(200);
      expect(response.body.aguaIngerida).toBe(
        loginResponse.body.usuario.metaAgua
      );
    });

    it("Deve deletar o usuário com sucesso", async () => {
      const response = await request(app)
        .delete("/usuario")
        .set("Authorization", `${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Usuário removido com sucesso");
    });
  });

  // Rotas de autenticação
  describe("Testando rotas de Autenticação", () => {
    it("Deve retornar um erro por não encontrar o usuário", async () => {
      const loginResponse = await request(app).post("/auth/login").send({
        email: "email@gmail.com",
        senha: "123123",
      });

      expect(loginResponse.status).toBe(401);
      expect(loginResponse.body.message).toBe("Usuário não encontrado");

      authToken = loginResponse.body.token;
    });

    it("Deve retornar um erro por ter inserido a senha errada", async () => {
      const loginResponse = await request(app).post("/auth/login").send({
        email: "sales@gmail.com",
        senha: "123456",
      });

      expect(loginResponse.status).toBe(401);
      expect(loginResponse.body.message).toBe("Credenciais inválidas");

      authToken = loginResponse.body.token;
    });

    it("Deve medir o tempo de criar uma conta e se logar nela", async () => {

      const start = Date.now(); // Inicia a medição de tempo
       await request(app).post("/usuario").send({
        nome: "Teste",
        sobrenome: "Silva",
        email: "teste.silva@example.com",
        senha: "123123",
        dataDeNascimento: "2005-06-27T12:30:00Z",
        peso: 60,
        altura: 165,
        nivelDeSedentarismo: "Sedentário",
        sexo: "Masculino",
        objetivo: "Dieta de Ganho de Massa Muscular",
      });

      const response = await request(app).post("/auth/login").send({
        email: "teste.silva@example.com",
        senha: "123123",
      });

      const end = Date.now(); 
      const duration = end - start; 

      expect(duration).toBeLessThan(500); 
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
    })
  });

  // Rotas de alimento
  describe("Testando as rotas de Alimento", () => {
    it("Deve criar um alimento com sucesso", async () => {
      const response = await request(app)
        .post("/alimento")
        .set("Authorization", `${generalAuthToken}`)
        .send({
          nome: "Energético Monster",
          preparo: "Não se aplica",
          porcao: 100,
          categoriaCodigo: 1,
          criadoEm: "2024-09-05",
          detalhes: {
            valorEnergetico: 3,
            proteinas: 0,
            lipidios: 0,
            carboidratos: 1.4,
            fibras: 0,
          },
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("detalhes");
      expect(response.body.nome).toBe("Energético Monster");

      alimentoId = response.body._id;
    });

    it("Deve listar todos os alimentos", async () => {
      const response = await request(app)
        .get("/alimento/?page=1&limit=10")
        .set("Authorization", `${generalAuthToken}`);

      expect(response.status).toBe(200);
      expect(response.body.alimentosComCategoria.length).toBeGreaterThan(0);

      alimentoId1 = response.body.alimentosComCategoria[0]._id;
      alimentoId2 = response.body.alimentosComCategoria[9]._id;

      expect(alimentoId1).toBeDefined();
      expect(alimentoId2).toBeDefined();
    });

    it("Deve retornar um erro por não ter token", async () => {
      const response = await request(app).get("/alimento/?page=1&limit=10");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Token não fornecido");
    });

    it("Deve buscar um alimento pelo ID", async () => {
      const response = await request(app)
        .get(`/alimento/${alimentoId}`)
        .set("Authorization", `${generalAuthToken}`);

      expect(response.status).toBe(200);
      expect(response.body._id).toBe(alimentoId);
      expect(response.body.nome).toBe("Energético Monster");
    });

    it("Deve atualizar o alimento com sucesso", async () => {
      const response = await request(app)
        .put(`/alimento/${alimentoId}`)
        .set("Authorization", `${generalAuthToken}`)
        .send({
          nome: "Energético Monster de Morango",
          preparo: "Não se aplica",
          porcao: 100,
          categoriaCodigo: 1,
          criadoEm: "2024-09-05",
          detalhes: {
            valorEnergetico: 3,
            proteinas: 20,
            lipidios: 0,
            carboidratos: 1.4,
            fibras: 0,
          },
        });

      expect(response.status).toBe(200);
      expect(response.body.nome).toBe("Energético Monster de Morango");
      expect(response.body.porcao).toBe(100);
    });

    it("Deve deletar o alimento com sucesso", async () => {
      const response = await request(app)
        .delete(`/alimento/${alimentoId}`)
        .set("Authorization", `${generalAuthToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Alimento deletado com sucesso");
    });

    it("Deve listar alimentos criados pelo usuário", async () => {
      const response = await request(app)
        .get("/alimento/criadosPorMim")
        .set("Authorization", `${generalAuthToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.alimentosComCategoria)).toBe(true);
    });
  });

  it("Deve retornar um erro por não ter token", async () => {
    const response = await request(app).get("/alimento/criadosPorMim");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Token não fornecido");
  });

  // Rotas de alimento consumido
  describe("Testando as rotas de Alimento Consumido", () => {
    it("Deve criar um alimento com sucesso", async () => {
        const response = await request(app)
            .post("/alimentoConsumido")
            .set("Authorization", `${generalAuthToken}`)
            .send({
                _id: alimentoId1,
                porcao: 100,
                quantidade: 2,
                nomeGrupo: "Café da Tarde",
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("detalhes");
        expect(response.body).toHaveProperty("nomeGrupo");
        expect(response.body).toHaveProperty("diaSemana");
        expect(typeof response.body.diaSemana).toBe("string");
        expect(response.body.diaSemana).toBe(diaSemanaAtual)
    });


    it("Deve remover UMA unidade do alimento com sucesso", async () => {
      const response = await request(app)
        .put("/alimentoConsumido/delete")
        .set("Authorization", `${generalAuthToken}`)
        .send({
          _id: alimentoId1,
          porcao: 100,
          quantidade: 1,
          nomeGrupo: "Café da Tarde",
        });

      expect(response.status).toBe(200);
      expect(response.body.alimentoConsumido).toHaveProperty("detalhes");
      expect(response.body.alimentoConsumido).toHaveProperty("nomeGrupo");
      expect(response.body.alimentoConsumido.quantidade).toBe(1);
    });

    it("Deve listar todos os alimentos consumidos", async () => {
      const response = await request(app)
        .get("/alimentoConsumido/me")
        .set("Authorization", `${generalAuthToken}`);

      expect(response.status).toBe(200);
      expect(response.body.alimentosComCategoria.length).toBeGreaterThan(0);
    });

    it("Deve listar todos os alimentos consumidos nessa semana", async () => {
      const response = await request(app)
        .get("/alimentoConsumido/me/semana")
        .set("Authorization", `${generalAuthToken}`);

      expect(response.status).toBe(200);
      
      // Expectativa ajustada para verificar a estrutura de resposta
      expect(response.body).toHaveProperty("Domingo")
      expect(response.body.Domingo).toHaveProperty("total")
      expect(response.body.Domingo).toHaveProperty("dia")
      expect(response.body.Domingo.dia).toBeTruthy()
      expect(response.body.Domingo.total).toHaveProperty("valorEnergetico")
      expect(Array.isArray(response.body.Domingo.alimentos)).toBeTruthy();
      expect(response.body).toHaveProperty(diaSemanaAtual);
      expect(Array.isArray(response.body[diaSemanaAtual].alimentos)).toBe(true);
      expect(response.body[diaSemanaAtual].alimentos[0].consumido).toBeTruthy()
      expect(response.body[diaSemanaAtual].alimentos[0].consumido).toBe(1)
    });

    it("Deve remover dar erro ao tentar remover mais vezes um alimento que sua quantidade", async () => {
      await request(app)
        .put("/alimentoConsumido/delete")
        .set("Authorization", `${generalAuthToken}`)
        .send({
          _id: alimentoId1,
          porcao: 100,
          quantidade: 1,
          nomeGrupo: "Café da Tarde",
        });

      const response = await request(app)
        .put("/alimentoConsumido/delete")
        .set("Authorization", `${generalAuthToken}`)
        .send({
          _id: alimentoId1,
          porcao: 100,
          quantidade: 1,
          nomeGrupo: "Café da Tarde",
        });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        "Alimento consumido não encontrado ou já removido"
      );
    });
  });

  // Rota de Categoria
  describe("Testando rotas de Categoria", () => {
    it("Deve listas todas as categorias", async () => {
      const response = await request(app)
        .get("/categoria")
        .set("Authorization", `${generalAuthToken}`);

      expect(response.status).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("Deve retornar um erro por não ter token", async () => {
      const response = await request(app).get("/categoria");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Token não fornecido");
    });
  });

  // Rotas de Dietas Fixas
  describe("Testando rotas de Dietas Fixas", () => {
    it("Deve criar uma dieta com sucesso", async () => {
      const response = await request(app)
        .post("/dieta")
        .set("Authorization", `${generalAuthToken}`)
        .send({
          diaSemana: [
            "Sexta-feira",
            "Segunda-feira",
            "Quarta-feira",
            "Quinta-feira",
          ],
          grupos: [
            {
              nome: "Almoço",
              alimentos: [
                {
                  alimentoId: alimentoId1,
                  nome: "Arroz (polido, parabolizado, agulha, agulhinha, etc.)",
                  preparo: "Não se aplica",
                  porcao: 100,
                  quantidade: 2,
                  categoriaCodigo: 1,
                  detalhes: {
                    valorEnergetico: 135.62,
                    proteinas: 2.5,
                    carboidratos: 27.78,
                    fibras: 1.55,
                    lipidios: 1.2,
                  },
                },
                {
                  alimentoId: alimentoId2,
                  nome: "Canjiquinha de milho em grão",
                  preparo: "Cru(a)",
                  porcao: 100,
                  quantidade: 2,
                  categoriaCodigo: 1,
                  detalhes: {
                    valorEnergetico: 79.68,
                    proteinas: 1.24,
                    carboidratos: 13.5,
                    fibras: 0.67,
                    lipidios: 2.2,
                  },
                },
              ],
            },
          ],
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Dietas criadas com sucesso!");
      expect(response.body).toHaveProperty("dietas");
      expect(response.body.dietas[0]).toHaveProperty("diaSemana");
      expect(response.body.dietas[0].removidoEm).toBeFalsy();
      expect(response.body.dietas[0]).toHaveProperty("_id");

      dietaId = response.body.dietas[0]._id;
    });

    it("Deve atualizar uma dieta pelo seu id", async () => {
      const response = await request(app)
        .put(`/dieta/${dietaId}`)
        .set("Authorization", `${generalAuthToken}`)
        .send({
          diaSemana: "Terça-feira",
          grupos: [
            {
              nome: "Almoço",
              alimentos: [
                {
                  alimentoId: alimentoId1,
                  nome: "Arroz (polido, parabolizado, agulha, agulhinha, etc.)",
                  preparo: "Não se aplica",
                  porcao: 100,
                  quantidade: 2,
                  categoriaCodigo: 1,
                  detalhes: {
                    valorEnergetico: 135.62,
                    proteinas: 2.5,
                    carboidratos: 27.78,
                    fibras: 1.55,
                    lipidios: 1.2,
                  },
                },
                {
                  alimentoId: alimentoId2,
                  nome: "Canjiquinha de milho em grão",
                  preparo: "Cru(a)",
                  porcao: 100,
                  quantidade: 2,
                  categoriaCodigo: 1,
                  detalhes: {
                    valorEnergetico: 79.68,
                    proteinas: 1.24,
                    carboidratos: 13.5,
                    fibras: 0.67,
                    lipidios: 2.2,
                  },
                },
              ],
            },
          ],
        });

      expect(response.status).toBe(200);
      expect(response.body.atualizadoEm).toBeTruthy();
      expect(response.body).toHaveProperty("diaSemana");
      expect(response.body.removidoEm).toBeFalsy();
      expect(response.body).toHaveProperty("_id");
      expect(response.body._id).toBe(dietaId);
    });

    it("Deve listar dietas criadas pelo usuário", async () => {
      const response = await request(app)
        .get("/dieta/me")
        .set("Authorization", `${generalAuthToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0]).toHaveProperty("diaSemana");
    });

    it("Deve retornar um erro por não ter token", async () => {
      const response = await request(app).get("/dieta/me");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Token não fornecido");
    });

    it("Deve listar dietas criadas pelo usuário em um dia da semana específico", async () => {
      const response = await request(app)
        .get("/dieta/me?diaSemana=Domingo")
        .set("Authorization", `${generalAuthToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("Deve buscar uma dieta específica pelo id", async () => {
      const response = await request(app)
        .get(`/dieta/${dietaId}`)
        .set("Authorization", `${generalAuthToken}`);

      expect(response.status).toBe(200);
      expect(response.body.atualizadoEm).toBeTruthy();
      expect(response.body).toHaveProperty("diaSemana");
      expect(response.body.diaSemana).toBe("Terça-feira");
      expect(response.body.removidoEm).toBeFalsy();
      expect(response.body).toHaveProperty("_id");
      expect(response.body._id).toBe(dietaId);
    });

    it("Deve deletar uma dieta", async () => {
      const response = await request(app)
        .delete(`/dieta/${dietaId}`)
        .set("Authorization", `${generalAuthToken}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Dieta removida com sucesso.");
    });

    it("Deve buscar uma dieta específica pelo id e falhar por ter sido apagada", async () => {
      const response = await request(app)
        .get(`/dieta/${dietaId}`)
        .set("Authorization", `${generalAuthToken}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe(
        "Dieta não encontrada ou já removida."
      );
    });
  });

  // Rotas dieta diária
  describe("Testando rotas de Dietas Diárias", () => {
    createAndLogin()
      .then((id) => {
        dietaAuthId = id;
      })
      .catch((error) => {
        console.error(error);
      });

    it("Deve criar uma dieta para hoje", async () => {
      await request(app)
        .post("/dieta")
        .set("Authorization", `${dietaAuthId}`)
        .send({
          diaSemana: [
            "Segunda-feira",
            "Terça-feira",
            "Quarta-feira",
            "Quinta-feira",
            "Sexta-feira",
            "Sábado",
            "Domingo",
          ],
          grupos: [
            {
              nome: "Almoço",
              alimentos: [
                {
                  alimentoId: alimentoId1,
                  nome: "Arroz (polido, parabolizado, agulha, agulhinha, etc.)",
                  preparo: "Não se aplica",
                  porcao: 100,
                  quantidade: 2,
                  categoriaCodigo: 1,
                  detalhes: {
                    valorEnergetico: 135.62,
                    proteinas: 2.5,
                    carboidratos: 27.78,
                    fibras: 1.55,
                    lipidios: 1.2,
                  },
                },
                {
                  alimentoId: alimentoId2,
                  nome: "Canjiquinha de milho em grão",
                  preparo: "Cru(a)",
                  porcao: 100,
                  quantidade: 2,
                  categoriaCodigo: 1,
                  detalhes: {
                    valorEnergetico: 79.68,
                    proteinas: 1.24,
                    carboidratos: 13.5,
                    fibras: 0.67,
                    lipidios: 2.2,
                  },
                },
              ],
            },
          ],
        });
      const response = await request(app)
        .get("/dietaDiaria/me/forma")
        .set("Authorization", `${dietaAuthId}`);

      expect(response.body[0]).toHaveProperty("diaSemana");
      expect(response.body[0].diaSemana).toBe(diaSemanaAtual)
      expect(response.body[0]).toHaveProperty("gruposConsumo");
      expect(response.body[0].gruposConsumo[0].alimentos[0]).toHaveProperty(
        "consumido"
      );
      expect(response.body[0].gruposConsumo[0].alimentos[0]).toHaveProperty(
        "paraConsumir"
      );
      expect(response.body[0].gruposConsumo[0].alimentos[0]).toHaveProperty(
        "alimento"
      );
      expect(response.body[0].gruposConsumo[0].alimentos[0].consumido).toBe(0);
    });

    it("Deve listar a dieta diária criada pelo usuário em um dia da semana específico", async () => {
      const response = await request(app)
        .get("/dietaDiaria/me?diaSemana=Domingo")
        .set("Authorization", `${dietaAuthId}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it("Deve listar todas as dietas diárias criadas pelo usuário", async () => {
      const response = await request(app)
        .get("/dietaDiaria/me")
        .set("Authorization", `${dietaAuthId}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0]).toHaveProperty("_id");

      dietaDiariaId = response.body[0]._id;
    });

    it("Deve retornar um erro por não ter token", async () => {
      const response = await request(app).get("/dietaDiaria/me");

      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Token não fornecido");
    });

    it("Deve buscar uma dieta diária por ID", async () => {
      const response = await request(app)
        .get(`/dietaDiaria/${dietaDiariaId}`)
        .set("Authorization", `${dietaAuthId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("diaSemana");
      expect(response.body).toHaveProperty("dia");
      expect(response.body).toHaveProperty("grupos");
    });

    it("Deve aumentar em um a quantia de alimentos consumidos", async () => {
      await request(app)
        .post("/alimentoConsumido")
        .set("Authorization", `${dietaAuthId}`)
        .send({
          _id: alimentoId1,
          porcao: 100,
          quantidade: 1,
          nomeGrupo: "Almoço",
        });

      const response = await request(app)
        .get("/dietaDiaria/me/forma")
        .set("Authorization", `${dietaAuthId}`);

      expect(response.body[0]).toHaveProperty("gruposConsumo");
      expect(response.body[0].gruposConsumo[0].alimentos[0]).toHaveProperty(
        "consumido"
      );
      expect(response.body[0].gruposConsumo[0].alimentos[0]).toHaveProperty(
        "paraConsumir"
      );
      expect(response.body[0].gruposConsumo[0].alimentos[0].consumido).toBe(1);
    });
  });
});

describe("UsuarioFunc", () => {
  let usuarioFunc: UsuarioFunc;

  beforeEach(() => {
    usuarioFunc = new UsuarioFunc();
  });

  describe("Testando calculadoraIMC", () => {
    it("Deve calcular o IMC corretamente", () => {
      const altura = 180; // cm
      const peso = 75; // kg
      const imc = usuarioFunc.calculadoraIMC(altura, peso);
      expect(imc).toBeCloseTo(23.15, 2); // 75 / (1.8 * 1.8) ≈ 23.15
    });
  });

  describe("Testando calculadoraIdade", () => {
    it("Deve calcular a idade corretamente", () => {
      const dataDeNascimento = new Date("2000-01-01");
      const idade = usuarioFunc.calculadoraIdade(dataDeNascimento);
      expect(idade).toBe(new Date().getFullYear() - 2000); // Calcula a idade com base no ano atual
    });
  });

  describe("Testando calculadoraTaxaMetabolismoBasal", () => {
    it("Deve calcular a TMB corretamente para masculino", async () => {
      const peso = 75; // kg
      const altura = 180; // cm
      const idade = 25; // anos
      const sexo = "Masculino";
      const tmb = usuarioFunc.calculadoraTaxaMetabolismoBasal(
        peso,
        altura,
        idade,
        sexo
      );
      expect(tmb).toBeCloseTo(1814.86, 1.1); // 88.36 + 13.4 * 75 + 4.8 * 180 - 5.7 * 25
    });

    it("Deve calcular a TMB corretamente para feminino", async () => {
      const peso = 60; // kg
      const altura = 170; // cm
      const idade = 30; // anos
      const sexo = "Feminino";
      const tmb = usuarioFunc.calculadoraTaxaMetabolismoBasal(
        peso,
        altura,
        idade,
        sexo
      );
      expect(tmb).toBeCloseTo(1397.6, 1); // 447.6 + 9.2 * 60 + 3.1 * 170 - 4.3 * 30
    });
  });

  describe("Testando calculadoraCaloriasGastas", () => {
    it("Deve calcular as calorias gastas para sedentário", async () => {
      const nivelDeSedentarismo = "Sedentário";
      const taxaMetabolismoBasal = 1800; // TMB exemplo
      const caloriasGastas = usuarioFunc.calculadoraCaloriasGastas(
        nivelDeSedentarismo,
        taxaMetabolismoBasal
      );
      expect(caloriasGastas).toBe(2160); // 1800 * 1.2
    });

    it("Deve calcular as calorias gastas para moderadamente ativo", async () => {
      const nivelDeSedentarismo = "Moderadamente ativo";
      const taxaMetabolismoBasal = 1800; // TMB exemplo
      const caloriasGastas = usuarioFunc.calculadoraCaloriasGastas(
        nivelDeSedentarismo,
        taxaMetabolismoBasal
      );
      expect(caloriasGastas).toBe(2790); // 1800 * 1.55
    });
  });

  describe("Testando calcularConsumoDeCaloriaPorDia", () => {
    it("Deve calcular o consumo de calorias para emagrecimento", async () => {
      const objetivo = "Dieta de emagrecimento";
      const gastoDeCaloria = 2000; // Calorias gastas
      const consumo = usuarioFunc.calcularConsumoDeCaloriaPorDia(
        objetivo,
        gastoDeCaloria
      );
      expect(consumo).toBe(1600); // 2000 - 2000 * 0.2
    });

    it("Deve calcular o consumo de calorias para ganho de massa muscular", async () => {
      const objetivo = "Dieta de Ganho de Massa Muscular";
      const gastoDeCaloria = 2000; // Calorias gastas
      const consumo = usuarioFunc.calcularConsumoDeCaloriaPorDia(
        objetivo,
        gastoDeCaloria
      );
      expect(consumo).toBe(2300); // 2000 + 2000 * 0.15
    });
  });

  describe("Testando calcularMetaAgua", () => {
    it("Deve calcular a meta de água corretamente", async () => {
      const peso = 70; // kg
      const meta = await usuarioFunc.calcularMetaAgua(peso);
      expect(meta).toBe(2450); // 70 * 35
    });
  });

  describe("Testando checagemAgua", () => {
    it("Deve reiniciar o consumo de água se for um novo dia", async () => {
      const usuario = {
        agua: { aguaIngerida: 0, atualizacao: new Date() },
        save: jest.fn(),
      };
      const atualizacao = new Date();
      const forcedDate = new Date(atualizacao);
      forcedDate.setDate(forcedDate.getDate() - 1); // Simulando que é um novo dia

      await usuarioFunc.checagemAgua(atualizacao, usuario, forcedDate);
      expect(usuario.agua.aguaIngerida).toBe(0);
      expect(usuario.agua.atualizacao).toBeInstanceOf(Date);
      expect(usuario.save).toHaveBeenCalled();
    });

    it("Deve não reiniciar o consumo de água se não for um novo dia", async () => {
      const usuario = {
        agua: { aguaIngerida: 500, atualizacao: new Date() },
        save: jest.fn(),
      };
      const atualizacao = new Date();
      const forcedDate = new Date(atualizacao); // Simulando que não é um novo dia

      await usuarioFunc.checagemAgua(atualizacao, usuario, forcedDate);
      expect(usuario.agua.aguaIngerida).toBe(500);
      expect(usuario.save).not.toHaveBeenCalled();
    });
  });
});