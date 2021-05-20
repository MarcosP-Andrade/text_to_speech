const bodyParser = require("body-parser")
const express = require("express")
const Primary = require('./controller/controlador')
const path = require('path');

const server = express() //cria o servidor
const primary = new Primary()

server.use(express.static(__dirname + '/views'));
server.use(express.static(__dirname + '/public'));

//config engines
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, '/public'));

//server.set('view engine', 'ejs')
server.set('views', __dirname);
server.use(bodyParser.urlencoded({extended: true})); 
server.use(bodyParser.json()) 
server.post("/create",primary.create) //rota para adicionar comentarios
server.get("/listOfComments",primary.search) //rota para pesquisar os comentarios
server.post("/listen",primary.listening) //rota para buscar o comentario e transforma-lo em audio
server.get('/interface', (req, res) => {
    res.render('./public/views/index')
});

server.listen(8080,function(){ //executa o servidor na porta selecionada
    console.log("Servidor Rodando na url http://localhost:8080")
})

