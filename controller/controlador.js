const Conexao = require('../db/connection');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const fs = require('fs');

class primary{

    async create(req,res){ //funcao para inserção do comentario

        const conexao = new Conexao(); 

        var {comentario} = req.body;
        
        if (!comentario || comentario == ''){ //verifica se o comentario foi diferente de vazio
            return res.status(406).json({
                "Error": "406 - Not Acceptable!"
            })
        }else{
            try{// fazendo a conexão com o banco de dados
                var con = await conexao.connection();
            }catch{ //caso de erro na conexão com o banco de dados
                return res.status(500).json({
                    "Error": "500 - Internal Server Error!"
                })
            }

            var query = 'INSERT INTO comments(msg) VALUES (?)';

            try{
                con.query(query, comentario, function (err, results){
                    if (err){
                        throw err;
                    }else{
                        return res.status(200).json({
                            "results": results
                        })
                    }
                });
            }catch{
                return res.status(400).json({
                    "Error": "404 - Bad request!"
                })
            }
        }
    }

    async search(req,res){ // função de pesquisa dos comentarios
        
        const conexao = new Conexao();
        
        var {comentario} = req.body;

        try{  // faz a conexão com o banco de dados
            var con = await conexao.connection();
        }catch{
            return res.status(500).json({
                "Error": "500 - Internal Server Error!"
            })
        }
        
        var query = 'SELECT * FROM comments';

        try{ //executando a query de busca no banco de dados
            con.query(query, comentario, function (err, results){
                if (err){
                    throw err;
                }else{
                    return res.status(200).json({
                        "results": results
                    })
                }
            }); 
        }catch{
            return res.status(404).json({
                "Error": "404 - Not found!"
            })
        }   
    }

    async listening(req,res){

        const conexao = new Conexao();

        var {idComentario} = req.body;

        const textToSpeech = new TextToSpeechV1({
            authenticator: new IamAuthenticator({
                apikey: 'Your Key',
            }),
                serviceUrl: 'Your URL',
        }); 
        
        try{
            var con = await conexao.connection();
        }catch{
            return res.status(500).json({
                "Error": "500 - Internal Server Error!"
            })
        }
        
        var query = 'SELECT msg FROM comments WHERE id = (?)';
        
        //executando a query de busca no banco de dados
        con.query(query, idComentario, function (err, results){
            const texto = results[0].msg

            const params = {
                text: texto, //texto a ser transformado
                voice: 'pt-BR_IsabelaVoice', //a voz selecionada
                accept: 'audio/wav'
            };

            if (err){
                return res.status(404).json({
                    "Error": "400 - Bad request!"
                })
            }else{
                textToSpeech
                .synthesize(params)
                .then(res => {
                    const audio = res.result;
                    return textToSpeech.repairWavHeaderStream(audio);
                })
                .then(repairedAudio => {
                    fs.writeFileSync('public/listen/audio.wav', repairedAudio); //audio criado no caminho selecionado
                    return res.status(201).json({
                        "sucess": true,
                        "message": "Audio criado com sucesso!",
                       "url": "../listen/audio.wav"
                 });             
                })
                .catch(err => { //caso nao consiga realizar a transformação
                    return res.status(406).json({
                        "sucess":false,
                        "Error": "406 - Not acceptable!"
                    });
                });
            }
        });
    }
}
module.exports = primary;