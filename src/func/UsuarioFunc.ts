export default class UsuarioFunc{
    public calculadoraIMC(altura: number, peso: number):number{
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

    public async calculadoraTaxaMetabolismoBasal(peso: number, altura: number, idade: number, sexo: string): Promise<number>{
        let taxaMetabolismoBasal = 0
        
        if(sexo === "Masculino"){
            taxaMetabolismoBasal = 66 + 13.8*peso + 5*altura - 6.8*idade
        }else{
            taxaMetabolismoBasal = 655 + 9.6*peso + 1.8*altura - 4.7*idade
        }
        
        return taxaMetabolismoBasal
    } 

    public async calculadoraCaloriasGastas(nivelDeSedentarismo: string, taxaMetabolismoBasal: number):Promise<number>{
        let TMB = taxaMetabolismoBasal
        let caloriasGastas = 0
        switch(nivelDeSedentarismo){
            case "Sedentário":
                caloriasGastas = TMB*1.2
                break 
            case "Levemente ativo":
                caloriasGastas = TMB*1.375
                break
            case "Moderadamente ativo":
                caloriasGastas = TMB*1.55
                break
            case "Altamente ativo":
                caloriasGastas = TMB*1.725
                break
            case "Extremamente ativo":
                caloriasGastas = TMB * 1.9
        }
    
        return caloriasGastas
    } 
}

// Sedentário (pouco ou nenhum exercício): TMB × 1,2
// Levemente ativo (exercício leve 1-3 dias/semana): TMB × 1,375
// Moderadamente ativo (exercício moderado 3-5 dias/semana): TMB × 1,55
// Altamente ativo (exercício intenso 6-7 dias/semana): TMB × 1,725
// Extremamente ativo (exercício físico intenso e trabalho físico): TMB × 1,9
