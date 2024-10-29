import request from 'supertest';
import express, { Application } from 'express';
import CategoriaController from '../controllers/CategoriaController';
import Categoria from '../models/categoria';

// Mock da função do model Categoria
jest.mock('../models/categoria');

const app: Application = express();
app.use(express.json());
app.get('/categorias', CategoriaController.list);

describe('CategoriaController', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa os mocks antes de cada teste
    });

    it('deve retornar status 200 e a lista de categorias', async () => {
        // Mock da função Categoria.find para retornar uma lista fake de categorias
        (Categoria.find as jest.Mock).mockResolvedValue([
            { 
                _id: '1', 
                codigo: 101, 
                nome: 'Categoria 1', 
                urlPlaceholder: 'https://example.com/categoria1.jpg',
                criadoEm: new Date(),
                atualizadoEm: null,
                removidoEm: null
            },
            { 
                _id: '2', 
                codigo: 102, 
                nome: 'Categoria 2', 
                urlPlaceholder: 'https://example.com/categoria2.jpg',
                criadoEm: new Date(),
                atualizadoEm: null,
                removidoEm: null
            }
        ]);

        const response = await request(app).get('/categorias');
        
        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { 
                _id: '1', 
                codigo: 101, 
                nome: 'Categoria 1', 
                urlPlaceholder: 'https://example.com/categoria1.jpg',
                criadoEm: expect.any(String), // Verifica se é uma string (data)
                atualizadoEm: null,
                removidoEm: null
            },
            { 
                _id: '2', 
                codigo: 102, 
                nome: 'Categoria 2', 
                urlPlaceholder: 'https://example.com/categoria2.jpg',
                criadoEm: expect.any(String), // Verifica se é uma string (data)
                atualizadoEm: null,
                removidoEm: null
            }
        ]);
        expect(Categoria.find).toHaveBeenCalledWith({ removidoEm: null });
    });

    it('deve retornar status 500 em caso de erro', async () => {
        // Mock da função Categoria.find para simular um erro
        (Categoria.find as jest.Mock).mockRejectedValue(new Error('Erro ao buscar categorias'));

        const response = await request(app).get('/categorias');
        
        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            message: "Erro ao listar categorias",
            error: {}
        });
    });
});
