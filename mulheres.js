const express = require("express"); // Iniciando o express
const router = express.Router(); // Configurando a primeira parte da rota
const cors = require('cors')//acessando o pacote do cors, que permite o consumo desta API no frontend

const conectaBancoDeDados = require('./bancoDeDados')//Conectando ao arquivo banco de dados
conectaBancoDeDados();// chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')
const app = express(); // Iniciando o app
app.use(express.json());
app.use(cors())
const porta = 3333; //crando a porta

// GET
async function mostrarMulheres(request, response) {
  try{
    const mulheresVindasDoBancoDeDados = await Mulher.find()

    response.json(mulheresVindasDoBancoDeDados)
  }catch (erro){
    console.log(erro)
  }
}

// POST
async function criarMulher(request, response) {
  const novaMulher = new Mulher ({
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao
  })

  try{
    const mulherCriada = await novaMulher.save()
    response.status(201).json(mulherCriada)
  } catch (erro){
    console.log(erro)
  }
}

// PATCH
async function corrigeMulher(request, response){
  try {
    const mulherEncontrada = await Mulher.findById(request.params.id)

    if(request.body.nome){
      mulherEncontrada.nome = request.body.nome
    }

    if(request.body.minibio){
      mulherEncontrada.minibio = request.body.minibio
    }

    if(request.body.imagem){
      mulherEncontrada.imagem = request.body.imagem
    } 

    if (request.body.citacao){
      mulherEncontrada.citacao = request.body.citacao
    }
    
    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

    response.json(mulherAtualizadaNoBancoDeDados)
  }catch (erro){
    console.log(erro)
  }
}

// DELETE
async function deletaMulher(request, response){
  try{
    await Mulher.findByIdAndDelete(request.params.id)
    response.json({message: 'Mulher deletada com sucesso!'})
  }catch (erro){
    console.log(erro)
  }
}

// Porta
function mostrarPorta() {
  console.log("Servidor criado e rodando na porta", porta);
}

app.use(router.get("/mulheres", mostrarMulheres)); // Configuração da rota GET /mulheres
app.use(router.post("/mulheres", criarMulher)); //Configuração da rota POST /criarMulher
app.use(router.patch('/mulheres/:id', corrigeMulher))// configuração da rota PATC /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher))// configuração da rota DELETE /mulheres/:id
app.listen(porta, mostrarPorta); // servido ouvindo a porta
