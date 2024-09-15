import { Request, Response } from 'express';
import { IAlimentoDieta, IDietaFixa, IGrupo, IDietaDetalhes } from '../Interfaces/IDieta';
import { IAlimento } from '../Interfaces/IAlimento';
import AlimentoModel from '../models/alimento';
import DietaFixaModel from '../models/dietaFixa';

class DietaController {
    static async criarDieta(req: Request, res: Response): Promise<Response> {
        try {
            const { userId, diaSemana, grupos } = req.body;

            if (!userId || !diaSemana || !grupos || !Array.isArray(grupos)) {
                return res.status(400).json({ message: 'Parâmetros inválidos ou ausentes.' });
            }

            const gruposCompletos: IGrupo[] = await Promise.all(
                grupos.map(async (grupo: { nome: string, alimentos: { alimentoId: string, porcao: number, quantidade: number }[] }) => {
                    const alimentosCompletos: IAlimentoDieta[] = await Promise.all(
                        grupo.alimentos.map(async ({ alimentoId, porcao, quantidade }) => {
                            const alimento: IAlimento | null = await AlimentoModel.findById(alimentoId);
                            if (!alimento) {
                                throw new Error(`Alimento com ID ${alimentoId} não encontrado.`);
                            }

                            const alimentoDieta: IAlimentoDieta = {
                                nome: alimento.nome,
                                preparo: alimento.preparo,
                                quantidade,
                                porcao,
                                categoriaCodigo: alimento.categoriaCodigo,
                                detalhes: {
                                    valorEnergetico: alimento.detalhes.valorEnergetico * quantidade,
                                    proteinas: alimento.detalhes.proteinas * quantidade,
                                    carboidratos: alimento.detalhes.carboidratos * quantidade,
                                    fibras: alimento.detalhes.fibras * quantidade,
                                    lipidios: alimento.detalhes.lipidios * quantidade,
                                }
                            };

                            return alimentoDieta;
                        })
                    );

                    return {
                        nome: grupo.nome,
                        alimentos: alimentosCompletos
                    };
                })
            );

            const dietaDetalhes: IDietaDetalhes = gruposCompletos.reduce((totais, grupo) => {
                grupo.alimentos.forEach(alimento => {
                    const { detalhes } = alimento;
                    totais.valorEnergetico += detalhes.valorEnergetico;
                    totais.proteinas += detalhes.proteinas;
                    totais.carboidratos += detalhes.carboidratos;
                    totais.fibras += detalhes.fibras;
                    totais.lipidios += detalhes.lipidios;
                });
                return totais;
            }, {
                valorEnergetico: 0,
                proteinas: 0,
                carboidratos: 0,
                fibras: 0,
                lipidios: 0
            });

            const novaDieta = new DietaFixaModel({
                usuarioId: userId,
                diaSemana,
                criadoEm: new Date(),
                detalhes: dietaDetalhes,
                grupos: gruposCompletos
            });

            await novaDieta.save();

            return res.status(201).json(novaDieta);

        } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao criar dieta.', error: error.message });
        }
    }
}

export default DietaController;
