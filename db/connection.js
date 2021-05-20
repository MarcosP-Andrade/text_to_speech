var mysql = require('mysql')

class ConnectionDataBase{
    async connection(){

        const con = mysql.createConnection({
            host: 'localhost', // O host do banco
            user: 'root', // Um usuário do banco
            password: '', // A senha do usuário
            database: 'testspeech' // nome do banco de dados
        })
        
        if(global.connection && global.connection.state !== 'disconnected'){
            return global.connection
        }
        
        con.connect((err) => { //faz a conexão com o banco de dados
            if (err) {
                console.log('Erro connecting to database...', err)
                return
            }
            console.log('Connection established!')
        })
        global.connection = con    
        return con
    }
}
module.exports = ConnectionDataBase
