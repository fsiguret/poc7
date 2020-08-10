const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'dbuser',
    password : 's3krefg7',
    database : 'MANIA'
});

connection.connect(function (err) {
    if(err) {
        console.log("La connetion à Mysql à réussie !");
    } else {
        console.log("La connetion à Mysql à échouée.");
    }
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

module.exports = app;
