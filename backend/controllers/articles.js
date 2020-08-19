const mysql = require('mysql');
const connection = require('../config/config');
const fs = require('fs');

exports.getAllArticles = (req, res, next) => {

  let sql = `SELECT * FROM Articles`;

  //QUERY SELECT
  connection.query(sql, (error, results, fields) => {
    if (error) {
      res.status(500).send("Une erreur serveur est survenue. " + error);
    } else if (results[0] === null || results[0] === undefined){
      res.status(404).send("Aucuns articles trouvés.");
    } else {
      res.status(200).json({ results });
    }
  });
};

exports.addArticle = (req, res, next) => {
  const isFile = (!(req.file === null || req.file === undefined));

  //request SQL
  let sqlNotFile = `INSERT INTO Articles (userId, text, date)
                VALUES (?,?, NOW())`;

  let sqlFile = `INSERT INTO Articles (userId, text, date, imageUrl)
                VALUES (?, ?, NOW(), ?)`;

    if (!isFile) { //if not file
      let valuesNotFile = [req.body.userId, req.body.text];
      //QUERY INSERT
      connection.query(sqlNotFile, valuesNotFile, (error, results, fields) => {
        if(error) {
          res.status(500).send("L'article n'a pas pu être enregistré. " + error);
        } else {
          res.status(201).json({ message: "L'article a bien été enregistré sans fichier." });
        }
      });
    } else if(isFile)  { // if file

      const bodyArticle = JSON.parse(req.body.article);
      let fileUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
      let valuesFile = [bodyArticle.userId, bodyArticle.text, fileUrl];

      //QUERY INSERT
      connection.query(sqlFile, valuesFile, (error, results, fields) => {
        if (error) {
          fs.unlink(`images/${req.file.filename}`, () => {});
          res.status(500).send("L'article n'a pas pu être enregistré." + error);
        } else {
          res.status(201).json({ message: "L'article a bien été enregistré avec fichier." });
        }
      });
    }
};

exports.getOneArticle = (req, res, next) => {
  //request SQL
  let sql = `SELECT * FROM Articles WHERE id = ` + mysql.escape(req.params.id);

  //QUERY SELECT
  connection.query(sql,(error, results, fields) => {
    if(error) {
      res.status(500).send("Une erreur serveur est survenue : " + error);
    } else if (results[0] === null || results[0] === undefined) {
      res.status(404).send("Aucuns articles trouvés.");
    } else  {
      res.status(200).json({ results });
    }
  });
};

exports.changeArticle = (req, res, next) => {
  let isFile = ((!(req.file === null || req.file === undefined)));
  //request SQL
  let sqlNotFile = `UPDATE Articles
                    SET text = ?, date = NOW() WHERE userId = ? AND id = ?` ;
  let sqlFile = `UPDATE Articles SET text = ?, imageUrl = ?, date = NOW() WHERE userId = ? AND id = ?`;
  let sqlSelect = `SELECT imageUrl, userId FROM Articles WHERE id =`+ mysql.escape(req.params.id);

  if(!isFile){
    let valuesNotFile = [req.body.text, req.body.userId, req.params.id];

    //QUERY UPDATE
    connection.query(sqlNotFile, valuesNotFile, (error, results, fields) => {
      if(error) {
        res.status(500).send("L'article n'a pas pu être modifié.");
      } else {
        res.status(201).json({ message: "L'article a bien été modifié." });
      }
    });

  } else if(isFile) {
    const objectArticle = JSON.parse(req.body.article);

    let fileUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    let valuesFile = [objectArticle.text, fileUrl, objectArticle.userId, req.params.id];

    //QUERY SELECT
    connection.query(sqlSelect, (error, resultsSelect, fields) => {
      if (error) {
        res.status(500).send("Une erreur est survenue : " + error);

      } else {

        const filename = resultsSelect[0].imageUrl.split('/images/')[1];

        fs.unlink(`images/${filename}`, () => {

          //QUERY UPDATE
            connection.query(sqlFile, valuesFile, (error, results, fields) => {

            if(error || resultsSelect[0].userId !== req.body.userId) {

                fs.unlink(`images/${req.file.filename}`, () => {});
                res.status(500).send("L'article n'a pas pu être modifié car vous n'avez peut-être pas le bon userID.");

            } else {

                fs.unlink(`images/${req.file.filename}`, () => {});
                res.status(500).send("L'article n'a pas pu être modifié.");

            }
          });
        });
      }
    });
  }
};

exports.deleteOneArticle = (req, res, next) => {
  //request SQL
  let sqlDelete = `DELETE FROM Articles WHERE id = ? AND userId = ?`;
  let sqlSelect = `SELECT imageUrl FROM Articles WHERE id =`+ mysql.escape(req.params.id);

  let value = [req.params.id, req.body.userId];

  //QUERY SELECT
  connection.query(sqlSelect, (errorSelect, resultsSelect, fields) => {
    if (errorSelect) {
      res.status(500).send("l'article n'a pas pu être supprimé.");
    } else {

      //QUERY DELETE
      connection.query(sqlDelete, value, (error, results, fields) => {
        if(error) {
          res.status(500).send("l'article n'a pas pu être supprimé.");
        } else {
          if(resultsSelect[0].imageUrl !== null) {
            const filename = resultsSelect[0].imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {});
          }
          res.status(200).send("L'article a bien été supprimé.");
        }
      });
    }
  });
};

exports.likeOrDislike = (req, res, next) => {

};
