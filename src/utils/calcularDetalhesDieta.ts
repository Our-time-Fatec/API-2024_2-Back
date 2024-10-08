import { IAlimentoDieta, IGrupo, IDietaDetalhes } from '../Interfaces/IDieta';
import { IAlimento } from '../Interfaces/IAlimento';
import AlimentoModel from '../models/alimento';

async function calcularDetalhesDieta(grupos: { nome: string, alimentos: { alimentoId: string, porcao: number, quantidade: number }[] }[]): Promise<{ gruposCompletos: IGrupo[], dietaDetalhes: IDietaDetalhes }> {
    const gruposCompletos: IGrupo[] = await Promise.all(
        grupos.map(async (grupo: { nome: string, alimentos: { alimentoId: string, porcao: number, quantidade: number }[] }) => {
            const alimentosCompletos: IAlimentoDieta[] = await Promise.all(
                grupo.alimentos.map(async ({ alimentoId, porcao, quantidade }) => {
                    const alimento: IAlimento | null = await AlimentoModel.findById(alimentoId);
                    if (!alimento) {
                        throw new Error(`Alimento com ID ${alimentoId} não encontrado.`);
                    }

                    const proporcaoPorcao = porcao / Number(alimento.porcao);

                    const alimentoDieta: IAlimentoDieta = {
                        alimentoId,
                        nome: alimento.nome,
                        preparo: alimento.preparo,
                        quantidade,
                        porcao,
                        categoriaCodigo: alimento.categoriaCodigo,
                        detalhes: {
                            valorEnergetico: alimento.detalhes.valorEnergetico * proporcaoPorcao * quantidade,
                            proteinas: alimento.detalhes.proteinas * proporcaoPorcao * quantidade,
                            carboidratos: alimento.detalhes.carboidratos * proporcaoPorcao * quantidade,
                            fibras: alimento.detalhes.fibras * proporcaoPorcao * quantidade,
                            lipidios: alimento.detalhes.lipidios * proporcaoPorcao * quantidade,
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

    return { gruposCompletos, dietaDetalhes };
}

export default calcularDetalhesDieta;
