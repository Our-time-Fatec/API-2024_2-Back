export default class UsuarioFunc{
    public async calculadoraIMC(altura: number, peso: number):Promise<Number>{
        let alt = altura / 100;
        let imc = peso / (alt * alt);
        return imc
    }

    // public calculadoraTaxaMetabolismoBasal(){

    // }
}