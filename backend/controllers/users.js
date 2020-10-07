const bcrypt = require('bcrypt');
const jwToken = require('jsonwebtoken');
const connection = require('../config/config');
const crypto = require('../middleware/crypto');
const deleteImg = require('../middleware/autoDeleteImages');
const privateKey = 'DEV_KEY'; //change this for production.

exports.signUp = (req, res, next ) => {
    let sqlSelectUsers = `SELECT * FROM Users`;
    let sql = `INSERT INTO Users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`;
    let alreadyExist = false;

    let usersEmail = [];

    connection.query(sqlSelectUsers, (errorSelectUsers, resultsSelectUsers, fields) => {
       if (errorSelectUsers) {
           res.status(500).send("Une erreur est survenue lors de la séléction des utilisateurs.");
       } else {
           resultsSelectUsers.forEach(user => {
               usersEmail.push(crypto.decrypt(user.email));
           });
       }

        usersEmail.forEach(email => {
            alreadyExist = email === req.body.email;
        })

        if(alreadyExist) {

            res.status(400).send("L'utilisateur éxiste déjà.");

        } else {
            bcrypt.hash(req.body.password, 10)
                .then(hash => {

                    let values = [crypto.encrypt(req.body.firstName), crypto.encrypt(req.body.lastName),  crypto.encrypt(req.body.email), hash];

                    connection.query(sql, values, (error, results, fields) => {
                        if (error) {
                            res.status(400).send("L'utilisateur n'a pas pu être enregistré.");
                        } else {
                            res.status(201).send("L'utilisateur a bien été enregistré.");
                        }
                    });
                })
                .catch(() => res.status(500).send("Une erreur c'est produite lors du hash."));
        }
    });
};

exports.login = (req, res, next ) => {
    let sqlSelectUsers = `SELECT * FROM Users`;
    let sql = `SELECT * FROM Users WHERE userId = ?`;
    let ifUser = false;
    let userId = [];
    let users = [];

    connection.query(sqlSelectUsers, (errorSelectUsers, resultsSelectUsers, fields) => {
        if (errorSelectUsers) {
            res.status(500).send("Une erreur est survenue lors de la séléction des utilisateurs.");
        } else {
            resultsSelectUsers.forEach(user => {
                users.push(user);
            });
        }

        users.forEach(user => {
            if(crypto.decrypt(user.email) === req.body.email) {
                userId = [user.userId];
                ifUser = true;
            }
        });

        if(!ifUser) {

            res.status(404).send("L'utilisateur n'éxiste pas.");

        } else {
            connection.query(sql, userId, (error, results, fields) => {
               if (error) {

                   res.status(500).send("Une erreur est survenue lors de la séléction de l'utilisateur.");

               } else {

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
                               res.status(401).send("Identifiant ou mot de passe incorrect.");
                           }
                       })
                       .catch(() => {
                           res.status(500).send("Une erreur c'est produite lors de la comparaison des mots de passe.")
                       });
               }
            });
        }
    });
};

exports.deleteUser = (req, res, next ) => {
    let sql = `SELECT * FROM Users WHERE userId = ?`;
    let value = [req.body.userId];

    connection.query(sql, value, (errorSelect, resultsSelect, fields) => {
       if (errorSelect || resultsSelect[0] === undefined) {
           if (resultsSelect[0] === undefined) {
               res.status(404).send("L'utilisateur n'éxiste pas.");
           } else {
               res.status(500).send("Une erreur est survenue lors de la séléction de l'utilisateur.");
           }
       } else {
           bcrypt.compare(req.body.password, resultsSelect[0].password)
               .then(valid => {
                   if(valid) {

                       let sqlSelectArticles = `SELECT * FROM Articles WHERE userId = ?`;
                       let valueSelectArticles = [req.body.userId];

                       connection.query(sqlSelectArticles, valueSelectArticles, (errorSelectArticles, resultsSelectArticles, fields) => {
                           if (errorSelectArticles) {
                               res.status(500).send("Une erreur c'est produite lors de la séléction des articles de l'utilisateur.");
                           } else {

                               const ifUndefined = (!(resultsSelectArticles[0] === null || resultsSelectArticles[0] === undefined));

                               if(ifUndefined) {
                                   if(resultsSelectArticles[0].imageUrl !== undefined) {
                                       deleteImg.deleteImg(resultsSelectArticles[0].imageUrl);
                                   }
                               }

                               let sqlDelete = `DELETE FROM Users WHERE userId = ?`;
                               let valueDelete = [req.body.userId];

                               connection.query(sqlDelete, valueDelete, (error, results, fields) => {
                                   if(error) {
                                       res.status(500).send("l'utilisateur n'a pas pu être supprimé.");
                                   } else {

                                       res.status(200).send("L'utilisateur a bien été supprimé.");
                                   }
                               });
                           }
                       });
                   }else {
                       res.status(400).send("Identifiant ou mot de passe incorrect.");
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

    let results = {};

    connection.query(sql, value, (error, resultsSelect, fields) => {
       if (error || resultsSelect === null) {
           if(resultsSelect === null) {
               res.status(404).send("l'utilisateur n'éxiste pas.");
           } else {
               res.status(500).send("Une erreur c'est produite pendant la sélection de l'utilisateur.");
           }
       } else {
           results = {
               userId: resultsSelect[0].userId,
               firstName: crypto.decrypt(resultsSelect[0].firstName),
               lastName: crypto.decrypt(resultsSelect[0].lastName),
               email: crypto.decrypt(resultsSelect[0].email),
               password: resultsSelect[0].password,
               rank: resultsSelect[0].rank
           };
           res.status(200).json({ results });
       }
    });
};
