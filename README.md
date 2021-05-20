# Text-To-Speech
## Este projeto faz a transformação de um Texto para Áudio, utilizando a API da IBM Watson, com **Node.js**.

#### Projeto prático desenvolvido durante o processo seletivo da **Smarkio**.
<br/>

## Pré-Requisitos
### Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas: **Git**, **Node.js**. Além disto é bom ter um editor para trabalhar com o código como **VSCode**.


## **Tecnologias**
### As seguintes ferramentas foram usadas na construção do projeto:
- [Node.js](https://nodejs.org/en/)
- [AJAX](https://www.w3schools.com/js/js_ajax_intro.asp)
- [Boostrap](https://getbootstrap.com/)
- [MySQL](https://www.mysql.com/)
- [JQuery](https://jquery.com/)
<br/>

# **Instalação**
### Para execuatar o projeto é necessario instalar alguns pacotes, execute o comando a seguir:
~~~~bash
    npm install
~~~~

# ***MySQL***
### Configuração do bando de dados
~~~~js
    const con = mysql.createConnection({
        host: 'host',
        user: 'user',
        password: 'password',
        database: 'database'
    })
~~~~
### Criação do banco de dados no ___PhpMyAdmin___ 
~~~~sql
    CREATE DATABASE testspeech;
    CREATE TABLE comments (
        id INT PRIMARY KEY AUTO_INCREMENT,
        msg VARCHAR(350)
    );
~~~~

# ***IBM Watson***
### Para a utilização da **API** da IBM Wtson.
#### Sendo necessário ter um conta grátis no ___web___ site da  IBM.
~~~~js
    const textToSpeech = new TextToSpeechV1({
        authenticator: new IamAuthenticator({
            apikey: 'Your Key',
        }),
            serviceUrl: 'Your URL',
        }); 
~~~~

# **Como executar o projeto**
##### ___Dentro do diretório do projeto___
~~~~ bash
    npm start
~~~~

## URL
~~~~ bash 
    http://localhost:8080/interface
~~~~


