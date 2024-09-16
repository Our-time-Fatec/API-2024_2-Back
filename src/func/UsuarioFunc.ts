export default class UsuarioFunc {
    public calculadoraIMC(altura: number, peso: number): number {
        let alt = altura / 100;
        let imc = peso / (alt * alt);
        return imc
    }

    public calculadoraIdade(dataDeNascimento: Date): number {
        const hoje = new Date();
        const dataNascimentoFormatada = new Date(dataDeNascimento);

        let idade = hoje.getFullYear() - dataNascimentoFormatada.getFullYear();
        const diferencaNoMes = hoje.getMonth() - dataNascimentoFormatada.getMonth();

        if (diferencaNoMes < 0 || (diferencaNoMes === 0 && hoje.getDate() < dataNascimentoFormatada.getDate())) {
            idade--;
        }

        return idade;
    }

    public async calculadoraTaxaMetabolismoBasal(peso: number, altura: number, idade: number, sexo: string): Promise<number> {
        let taxaMetabolismoBasal = 0

        if (altura < 100) {
            altura = altura * 100;
        }

        if (sexo === "Masculino") {
            taxaMetabolismoBasal = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * idade);
        } else {
            taxaMetabolismoBasal = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * idade);
        }

        return taxaMetabolismoBasal
    }

    public async calculadoraCaloriasGastas(nivelDeSedentarismo: string, taxaMetabolismoBasal: number): Promise<number> {
        let TMB = taxaMetabolismoBasal
        let caloriasGastas = 0
        switch (nivelDeSedentarismo) {
            case "Sedentário":
                caloriasGastas = TMB * 1.2
                break
            case "Levemente ativo":
                caloriasGastas = TMB * 1.375
                break
            case "Moderadamente ativo":
                caloriasGastas = TMB * 1.55
                break
            case "Altamente ativo":
                caloriasGastas = TMB * 1.725
                break
            case "Extremamente ativo":
                caloriasGastas = TMB * 1.9
        }

        return caloriasGastas
    }

    public async calcularConsumoDeCaloriaPorDia(objetivo: string, gastoDeCaloria: number): Promise<number> {
        let consumoDeCaloriaPorDia = 0
        let x = gastoDeCaloria
        switch (objetivo) {
            case "Dieta de emagrecimento":
                consumoDeCaloriaPorDia = x - (x * 0.20);
                break
            case "Dieta de Ganho de Massa Muscular":
                consumoDeCaloriaPorDia = x + (x * 0.15);
                break
            case "Dieta Low Carb":
                consumoDeCaloriaPorDia = x
                break
            default:
                consumoDeCaloriaPorDia = x
        }

        return consumoDeCaloriaPorDia
    }
}

// Sedentário (pouco ou nenhum exercício): TMB × 1,2
// Levemente ativo (exercício leve 1-3 dias/semana): TMB × 1,375
// Moderadamente ativo (exercício moderado 3-5 dias/semana): TMB × 1,55
// Altamente ativo (exercício intenso 6-7 dias/semana): TMB × 1,725
// Extremamente ativo (exercício físico intenso e trabalho físico): TMB × 1,9
