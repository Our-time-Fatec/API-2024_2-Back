export default class UsuarioFunc{
    public calculadoraIMC(altura: number, peso: number):number{
        let alt = altura / 100;
        let imc = peso / (alt * alt);
        return imc
    }

    // public calculadoraTaxaMetabolismoBasal(){

    // }
}