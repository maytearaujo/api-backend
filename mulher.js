const express = require("express");
const router = express.Router();

const app = express();
const porta = 3333;

function mostrarMulher(request, response) {
    response.json({
        nome: 'Maytê Araújo',
        imagem: 'https://avatars.githubusercontent.com/u/87009799?v=4',
        minibio: 'Desenvolvedora de software'
    });
}

function mostrarPorta(){
    console.log('Servidor criado e rodando na porta', porta);
}

app.use(router.get('/mulher', mostrarMulher))
app.listen(porta, mostrarPorta)