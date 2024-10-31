import { SerialPort } from 'serialport';

const port = new SerialPort({
  path: '', // Caminho do arduino
  baudRate: 9600,
});

const alarme = () =>{
    port.write('alarme', (err) =>{
        if(err){
            return console.log('Erro ao escrever na Porta Serial', err.message)
        }
        console.log('Comando de alarme enviado com sucesso');
    });
}

setInterval(alarme, 7200000)