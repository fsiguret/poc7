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

};

exports.likeOrDislike = (req, res, next) => {

};
