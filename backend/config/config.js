const mysql = require('mysql');


const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'HeadShot18700!',
    database : 'MANIA'
});

connection.connect(function (err) {
    if(err) {
        console.log("La connection à la base de données a échouée !");
    } else {
        console.log("La connection à la base de données a réussie !");
    }
});

module.exports = connection;
