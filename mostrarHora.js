const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;


function mostrarPorta(){
    console.log('Servidor criado e rodando na porta', porta);
}

function mostrarHora(request, response) {

    const data = new Date()
   
    const hora = data.toLocaleTimeString('pt-BR')
   
    response.send(hora)
   
   }

app.listen(porta, mostrarPorta)
app.use(router.get('/hora', mostrarHora))