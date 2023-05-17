const mysql = require("mysql2")

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root96472",
    database: "sys"
})


connection.connect((err) => {
    if(err)
    {
        console.log(err)
    }else{
        console.log("Conectado ao banco de dados")
    }
})

module.exports = connection
  