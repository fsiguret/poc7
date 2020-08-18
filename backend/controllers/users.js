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
    let sql = `SELECT * FROM Users WHERE email = ?`;
    let value = [req.body.email];

    connection.query(sql, value,(error, results, fields) => {
        if(error) {
            res.status(404).send("L'utilisateur n'éxiste pas." + error);
        } else  {
            bcrypt.compare(req.body.password, results[0].password)
                .then(valid => {
                    if(valid) {
                        res.status(200).json({
                            userId: results[0].userId,
                            token: jwToken.sign(
                                { userId: results[0].userId },
                                privateKey,
                                { expiresIn: '1h'  }
                            ),
                            message: "Connection réussie !"
                        });
                    }else {
                        res.status(400).send("mot de passe érroné.");
                    }
                })
                .catch(() => {
                    res.status(400).send("Une erreur c'est produite lors de la comparaison des mots de passe.")
                });
        }
    });
};

exports.deleteUser = (req, res, next ) => {

    let sql = `DELETE FROM Users WHERE email = ?`;
    let value = [req.body.email];

    connection.query(sql, value, (error, results, fields) => {
        if(error) {
            res.status(500).send("l'utilisateur n'a pas pu être supprimé.");
        } else {
            res.status(200).send("L'utilisateur a bien été supprimé.");
        }
    });
};

