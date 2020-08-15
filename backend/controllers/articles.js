const mysql = require('mysql');
const fileUpload = require('express-fileupload');
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

  if (!req.files || Object.keys(req.files).length === 0) {
    let sql = `INSERT INTO Articles (userId, text, date)
                VALUES (?,?, NOW())`;

    let values = [req.body.userId, req.body.text];

    connection.query(sql, values, (error, results, fields) => {
      if(error) {
        res.status(500).send("L'article n'a pas pu être enregistré. " + error);
      } else {
        res.status(201).send("L'article a bien été enregistré sans fichier.");
      }
    });
  } else  {
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
  let isJson = ((!(req.file === null || req.file === undefined)));

  if(!isJson){
    let sql = `UPDATE Articles
                SET text = ?`;

    let values = [req.body.text];

    connection.query(sql, values, (error, results, fields) => {
      if(error) {
        res.status(500).send("L'article n'a pas pu être modifiée.");
      } else {
        res.status(201).send("L'article a bien été modifié.");
      }
    });
  } else if(isJson) {
    //TODO gestion de modification de l'image.
  }
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
  let articleId = req.params.id;
  let userId = req.body.userId;
  let like = parseInt(req.body.like, 10);

  let sql = `SELECT * FROM UserLikes
                WHERE articleId = ?`;

  let value = [articleId];

  connection.query(sql,value,(error, userLikes, fields) => {
    if(error) {
      res.status(500).send("Une erreur est survenue : " + error);
    } else {

      if(like > 0) {
        let sql = `INSERT INTO Articles
              SET likes = likes + ?`;
        console.log(userLikes)

      } else if (like < 0) {

      }
    }
  });


};
