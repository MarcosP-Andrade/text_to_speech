$(document).ready(function(){

    $.ajax({
        url: "/listOfComments", //rota get para leitura de comentários
        dataType: 'json',
        method: "GET",
        statusCode:{  //tratando respostas..
            200:(res)=>{

                var comment= $('#comentarios'); //onde ira mostrar o resultado da pesquisa
                var texto = res['results'];

                texto.forEach(element => {
                    $('#comentarios').append("<div class='card bg-light text-dark container'><div class='container card-body card-style'>"+element.msg+"</div><div><button style='position:relative;' id='btnOuvir' class='btn btn-primary' name="+element.id+" onclick='' type='submit'>Ouvir</button></div>");
                });
            },
            404:(res)=>{
                console.log(res);
            }
        }
    });

    $("#btnEnviar").click(function(e) {
        e.preventDefault(); //setando
        var text = document.getElementById('areaTexto');
        var comentario = text.value;
        text.value = " ",
        $.ajax({
            method: "POST",
            url: "/create", //rota para criar comentário no database
            dataType: 'json',
            data: { comentario },
            statusCode: {
                400:()=>{
                    alert ('Error 400: Bad request!');
                },
                200:(res)=>{
                    console.log(res)
                    $('#comentarios').append("<div class='card bg-light text-dark container'><div class='container card-body card-style'>"+comentario+"</div><div style='position:relative;'><button id='btnOuvir' class='btn btn-primary' name="+res.results.insertId+" onclick='' type='submit'>Ouvir</button></div>"); 
                }
            },
            
        });
    });

   $(document).on("click", "#btnOuvir", (e) => {
        e.preventDefault() //setando
        var idComentario = e.target.parentElement.children[0].name;
        $.ajax({
            url: "/listen", 
            method: "POST",
            dataType: 'json',
            data: {idComentario},
            statusCode:{ 
                201:(res)=>{
                    nowDate = new Date();
                    $("#source").attr('src', "../listen/audio.wav"+"?"+nowDate.getTime()); //busca o arquivo de audio e limpa a cache do navegador
                    $("#audio").get(0).load();
                    $("#audio").get(0).play();
                },
                406:(res)=>{
                    console.log(res);
                }
            }
        });
    })
});