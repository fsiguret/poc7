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
                   res.status(400).send("L'utilisateur n'a pas pu être enregistré ou existe déjà.");
               } else {
                   res.status(201).json({ message: "L'utilisateur a bien été enregistré." });
               }
            });
        })
        .catch(() => res.status(500).send("Une erreur c'est produite lors du hash."));
};

exports.login = (req, res, next ) => {
    let sql = `SELECT * FROM Users WHERE email = ?`;
    let value = [req.body.email];

    connection.query(sql, value,(error, results, fields) => {
        if(error) {
            res.status(500).send("Une erreur est survenue lors de l'accès à la base de donnée");
        } else  {
            if(results[0] !== undefined) {
                bcrypt.compare(req.body.password, results[0].password)
                    .then(valid => {
                        if(valid) {
                            res.status(200).json({
                                userId: results[0].userId,
                                token: jwToken.sign(
                                    { userId: results[0].userId },
                                    privateKey,
                                    { expiresIn: '24h'  }
                                ),
                                message: "Connection réussie !"
                            });
                        }else {
                            res.status(400).send("mot de passe érroné.");
                        }
                    })
                    .catch(() => {
                        res.status(500).send("Une erreur c'est produite lors de la comparaison des mots de passe.")
                    });
            } else {
                res.status(400).send("L'utilisateur n'existe pas");
            }
        }
    });
};

exports.deleteUser = (req, res, next ) => {

    let sqlSelect = `SELECT * FROM Users WHERE email = ?`;
    let valueSelect = [req.body.email];

    let sql = `DELETE FROM Users WHERE email = ? AND userId = ?`;
    let value = [req.body.email, req.body.userId];

    connection.query(sqlSelect,valueSelect, (errorSelect, resultsSelect, fields) => {
        if (errorSelect || resultsSelect[0] === null) {
            if(resultsSelect[0] === null) {
                res.status(404).send("L'utilisateur n'éxiste pas");
            } else {
                res.status(500).send("Une erreur est survenue lors de la séléction de l'utilisateur.")
            }
        } else {

            bcrypt.compare(req.body.password, resultsSelect[0].password)
                .then(valid => {
                    if(valid) {
                        connection.query(sql, value, (error, results, fields) => {
                            if(error || results[0] === null) {
                                if (results[0] === null) {
                                    res.status(404).send("Un userID doit être défini dans votre requête.");
                                }else {
                                    res.status(500).send("l'utilisateur n'a pas pu être supprimé.");
                                }
                            } else {
                                res.status(200).send("L'utilisateur a bien été supprimé.");
                            }
                        });
                    }else {
                        res.status(400).send("mot de passe érroné.");
                    }
                })
                .catch(() => {
                    res.status(500).send("Une erreur c'est produite lors de la comparaison des mots de passe.")
                });
        }
    });

};

exports.getUser = (req, res, next) => {
    let sql = `SELECT * FROM Users WHERE userId = ? AND EXISTS (SELECT userId FROM Users WHERE userId = ?)`;

    let value = [req.params.id, req.params.id]

    connection.query(sql, value, (error, results, fields) => {
       if (error || results === null) {
           if(results === null) {
               res.status(404).send("l'utilisateur n'éxiste pas.");
           } else {
               res.status(500).send("Une erreur c'est produite pendant la sélection de l'utilisateur.");
           }
       } else {
           res.status(200).json({ results });
       }
    });
}

