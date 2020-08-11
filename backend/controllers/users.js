const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwToken = require('jsonwebtoken');
const connection = require('../config/config');

const privateKey = 'DEV_KEY'; //change this for production.



exports.signUp = (req, res, next ) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            let sql = `INSERT INTO Users (firstName, lastName, email, password) 
                        VALUES (?, ?, ?, ?)`;

            let values = [req.body.firstName, req.body.lastName, req.body.email, hash ]

            connection.query(sql, values, (error, results, fields) => {
               if(error) {
                   res.status(400).send("L'utilisateur n'a pas pu être enregistré ou existe déjà." + error);
               } else {
                   res.status(201).send("L'utilisateur a bien été enregistré.");
               }
            });
        })
        .catch(() => res.status(400).send("Une erreur c'est produite lors du hash."));
};

exports.login = (req, res, next ) => {

};

