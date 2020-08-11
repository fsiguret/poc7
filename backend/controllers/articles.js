const mysql = require('mysql');
const connection = require('../config/config');

exports.getAllArticles = (req, res, next) => {

  let sql = `SELECT * FROM Articles`;

  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(500).send("Une erreur serveur est survenue. " + error);
    } else {
      res.status(200).json({ results } );
    }
  });
};

exports.addArticle = (req, res, next) => {
  let isJson = ((!(req.file === null || req.file === undefined)));

  if(!isJson){
    let sql = `INSERT INTO Articles (userId, text, date)
                VALUES (?,?,?)`;
    let values = [req.body.userId, req.body.text, req.body.date];

    connection.query(sql, values, (error, results, fields) => {
      if(error) {
        res.status(500).send("L'article n'a pas pu être enregistré.");
      } else {
        res.status(201).send("L'article a bien été enregistré.");
      }
    });
  } else if(isJson) {
    //TODO gestion de l'ajout de l'image.
  }
};

exports.getOneArticle = (req, res, next) => {
  let sql = `SELECT * FROM Articles WHERE id = ` + mysql.escape(req.params.id);

  connection.query(sql,(error, results, fields) => {
    if(error) {
      res.status(500).send("Une erreur serveur est survenue : " + error);
    } else  {
      res.status(200).json({ results });
    }
  });
};

exports.changeArticle = (req, res, next) => {

};

exports.deleteOneArticle = (req, res, next) => {
  let sql = `DELETE FROM Articles WHERE id = ?`;
  let value = [req.params.id];

  connection.query(sql, value, (error, results, fields) => {
    if(error) {
      res.status(500).send("l'article n'a pas pu être supprimé.");
    } else {
      res.status(200).send("L'article a bien été supprimé.");
    }
  });
};

exports.likeOrDislike = (req, res, next) => {

};
