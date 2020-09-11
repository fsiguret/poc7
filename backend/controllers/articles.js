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
  let sqlNotFile = `INSERT INTO Articles (userId, titleArticle, content, createAt) VALUES (?,?,?, NOW())`;

  let sqlFile = `INSERT INTO Articles (userId, titleArticle, content, createAt, imageUrl) VALUES (?, ?, ?, NOW(), ?)`;

  if (!isFile) { //if not file
    let valuesNotFile = [req.body.userId, req.body.titleArticle, req.body.content];
    //QUERY INSERT
    connection.query(sqlNotFile, valuesNotFile, (error, results, fields) => {
      if(error) {
        res.status(500).send("L'article n'a pas pu être enregistré. ");
      } else {
        res.status(201).send("L'article a bien été enregistré sans fichier.");
      }
    });
  } else if(isFile)  { // if file
    const bodyArticle = JSON.parse(req.body.article);
    let fileUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    let valuesFile = [bodyArticle.userId, bodyArticle.titleArticle, bodyArticle.content, fileUrl];

        //QUERY INSERT

        connection.query(sqlFile, valuesFile, (error, results, fields) => {
          if (error) {
            fs.unlink(`images/${req.file.filename}`, () => {});
            res.status(500).send("L'article n'a pas pu être enregistré.");
          } else {
            res.status(201).send("L'article a bien été enregistré avec fichier.");
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
  let objectArticle = "";

  //request SQL
  let sqlIfExist = `SELECT EXISTS (SELECT id FROM Articles WHERE id = ?) AS isTrue`;
  let sqlNotFile = `UPDATE Articles SET titleArticle = ?, content = ?, createAt = NOW() WHERE userId = ? AND id = ?` ;
  let sqlFile = `UPDATE Articles SET titleArticle = ?, content = ?, imageUrl = ?, createAt = NOW() WHERE userId = ? AND id = ?`;
  let sqlSelect = `SELECT imageUrl, userId FROM Articles WHERE id =`+ mysql.escape(req.params.id);
  let sqlSelectRank = ``;


  let valuesNotFile = [];

  let valuesFile = [];

  if(isFile){
    objectArticle = JSON.parse(req.body.article);
    sqlSelectRank = `SELECT rank FROM Users WHERE userId = ` + mysql.escape(objectArticle.userId);
  } else {
    sqlSelectRank = `SELECT rank FROM Users WHERE userId = ` + mysql.escape(req.body.userId);
  }


  //QUERY SELECT RANK
  connection.query(sqlSelectRank, (errorSelectRank, resultsSelectRank, fields) => {
    if (errorSelectRank) {
      res.status(500).send("Une erreur est survenue lors de la séléction du rang de l'utilisateur. " + errorSelectRank);
    } else {
      if (resultsSelectRank[0].rank === 4) {
        if (!isFile) {
          sqlNotFile = `UPDATE Articles SET titleArticle = ?, content = ?, createAt = NOW() WHERE id = ?`;
          valuesNotFile = [req.body.titleArticle, req.body.content, req.params.id];
        } else {

          let fileUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

          sqlFile = `UPDATE Articles SET titleArticle = ?, content = ?, imageUrl = ?, createAt = NOW() WHERE id = ?`;
          valuesFile = [objectArticle.titleArticle, objectArticle.content, fileUrl, req.params.id];
        }
      } else if (resultsSelectRank[0] !== 4) {
        if (!isFile) {
          sqlNotFile = `UPDATE Articles SET titleArticle = ?, content = ?, createAt = NOW() WHERE userId = ? AND id = ?`;
          valuesNotFile = [req.body.titleArticle, req.body.content, req.body.userId, req.params.id];
        } else {

          let fileUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

          sqlFile = `UPDATE Articles SET titleArticle = ?, content = ?, imageUrl = ?, createAt = NOW() WHERE userId = ? AND id = ?`;
          valuesFile = [objectArticle.titleArticle, objectArticle.content, fileUrl, objectArticle.userId, req.params.id];
        }
      }
    }

    //QUERY SELECT IF EXISTS
    let valueIfExist = [req.params.id];
    connection.query(sqlIfExist, valueIfExist, (errorSelect, resultsSelect, fields) => {
      if (errorSelect) {
        res.status(500).send("Une erreur est survenue lors de la sélection de l'article." + errorSelect);
      } else if (resultsSelect[0].isTrue === 1) {
        if (!isFile) {
          //QUERY UPDATE
          connection.query(sqlNotFile, valuesNotFile, (error, results, fields) => {
            if (error || results.affectedRows === 0) {
              res.status(500).send("L'article n'a pas pu être modifié car vous essayez de modifier un Article ne vous appartenant pas, ou êtes connecté sur le mauvais compte.");
            } else {
              res.status(201).send("L'article a bien été modifié.");
            }
          });

        } else if (isFile) {
          //QUERY SELECT
          connection.query(sqlSelect, (error, resultsSelect, fields) => {
            if (error) {
              res.status(500).send("Une erreur est survenue : " + error);
            } else {
              const filename = resultsSelect[0].imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {

                //QUERY UPDATE
                connection.query(sqlFile, valuesFile, (error, results, fields) => {
                  if (error) {
                    fs.unlink(`images/${req.file.filename}`, () => {
                    });
                    res.status(500).send("Une erreur est survenue lors de la mise à jour de l'article." + error);
                  } else {
                    res.status(200).send("L'article à été modifié.");
                  }
                });
              });
            }
          });
        }
      } else {
        res.status(400).send("L'article n'existe pas.");
      }
    });
  });
};

exports.deleteOneArticle = (req, res, next) => {
  let selectIfExist = `SELECT * FROM Articles WHERE id = ? AND EXISTS (SELECT id FROM Articles WHERE id = ?)`;
  let sqlSelectRank = `SELECT rank FROM Users WHERE userId = ` + mysql.escape(req.body.userId);
  let sqlDelete = ``;

  let value = [];
  let valueIfExist = [req.params.id, req.body.userId];

  if(!req.body.userId) {
    res.status(500).send("Veuillez définir un utilisateur.");
  }

  //SELECT ARTICLE QUERRY
  connection.query(selectIfExist, valueIfExist, (errorIfExist, resultsIfExist, fields) => {
    if (errorIfExist || resultsIfExist[0] === undefined) {
      if (resultsIfExist[0] === undefined) {
        res.status(404).send("L'article n'éxiste pas.");
      } else {
        res.status(500).send("Une erreur c'est produite lors de la séléction de l'article.") ;
      }
    } else {
      //SELECT RANK QUERRY
      connection.query(sqlSelectRank, (errorSelectRank, resultsSelectRank, fields) => {
        if (errorSelectRank || resultsSelectRank[0] === undefined) {
          res.status(500).send("Une erreur est survenue lors de la séléction du rang de l'utilisateur.");
        } else {
          if (resultsSelectRank[0] === 4) {
            sqlDelete = `DELETE FROM Articles WHERE id = ?`;
            value = [req.params.id];
          } else if (resultsSelectRank[0] !== 4) {
            sqlDelete = `DELETE FROM Articles WHERE id = ? AND userId = ?`;
            value = [req.params.id, req.body.userId];
          }
          //DELETE QUERRY
          connection.query(sqlDelete, value, (error, results, fields) => {
            if (error || results.affectedRows === 0) {
              res.status(500).send("l'article n'a pas pu être supprimé.");
            } else {
              let isImg = ((!(resultsIfExist[0].imageUrl === null || resultsIfExist[0].imageUrl === undefined)));
              if (isImg) {
                const filename = resultsIfExist[0].imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                });
              }
              res.status(200).send("L'article a bien été supprimé.");
            }
          });
        }
      });
    }
  });
};

exports.likeOrDislike = (req, res, next) => {
  const articleId = req.params.id;
  const userId = req.body.userId;

  let likedOrNot = parseInt(req.body.like,10);
  let message = "";

  let sqlSelectArticlesAndUserLikes = `SELECT * FROM Articles INNER JOIN UserLikes ON Articles.id = UserLikes.articleId WHERE Articles.id = ? AND Userlikes.userId = ?`;
  let sqlInsert = ``;
  let sqlUpdate = ``;
  let sqlUpdateUserLikes = `UPDATE UserLikes SET isLike = ? WHERE userId = ? AND articleId = ?`;

  let valuesUpdateArticles = [articleId];

  if (likedOrNot > -1 && likedOrNot < 1) {
    likedOrNot = 0;
    message = "Vous n'avez plus d'avis pour cet article.";
  } else if(likedOrNot >= 1) {
    likedOrNot = 1;
    message = "Vous avez aimé l'article.";
  } else if (likedOrNot <= -1) {
    likedOrNot = -1;
    message = "Vous n'aimez pas l'article.";
  }

  let valuesSelectArticlesAndUserLikes = [articleId, userId];

  connection.query(sqlSelectArticlesAndUserLikes, valuesSelectArticlesAndUserLikes, (errorSelectArticle, resultsSelectArticle, fields) => {
    if (errorSelectArticle) {
      res.status(500).send("Une erreur est survenue lors de la jointure entre les tables Articles et UserLikes. " + errorSelectArticle);
    } else if (resultsSelectArticle[0] === undefined) {

      if (likedOrNot === 1) {
        sqlInsert = `INSERT INTO UserLikes (userId, articleId, isLike) VALUES (?,?,?)`;
        sqlUpdate = `UPDATE Articles SET likes = likes + 1 WHERE id = ?`;
      } else if (likedOrNot === -1) {
        sqlInsert = `INSERT INTO UserLikes (userId, articleId, isLike) VALUES (?,?,?)`;
        sqlUpdate = `UPDATE Articles SET dislikes = dislikes + 1 WHERE id = ?`;
      } else if (likedOrNot === 0) {
        res.status(500).send("Vous n'avez pas d'avis.");
        return;
      }

      //FIRST INSERT
      let valueInsert = [userId, articleId, likedOrNot, userId, articleId];
      connection.query(sqlInsert, valueInsert, (errorInsert, resultsInsert, fields) => {
        if (errorInsert) {
          res.status(500).send("Une erreur est survenue lors de l'insertion dans la table UserLikes. " + errorInsert);
        } else {
          //FIRST UPDATE
          connection.query(sqlUpdate, valuesUpdateArticles, (errorUpdate, resultsUpdate, fields) => {
            if (errorUpdate) {
              res.status(500).send("Une erreur est survenue lors de la mise à jour de la table Articles. " + errorUpdate);
            } else {
              res.status(200).send(message);
            }
          });
        }
      });
    } else {
      //UPDATE

      let isLike = resultsSelectArticle[0].isLike;

      if (likedOrNot === 1 && isLike === 0) {
        sqlUpdate = `UPDATE Articles SET likes = likes + 1 WHERE id = ?`;
      } else if (likedOrNot === -1 && isLike === 0) {
        sqlUpdate = `UPDATE Articles SET dislikes = dislikes + 1 WHERE id = ?`;
      } else if (likedOrNot === 0) {

        if(isLike === 1) {
          sqlUpdate = `UPDATE Articles SET likes = likes - 1 WHERE id = ?`;
        }else if(isLike === -1) {
          sqlUpdate = `UPDATE Articles SET dislikes = dislikes - 1 WHERE id = ?`;
        } else {
          res.status(500).send("Vous n'avez pas d'avis.");
          return;
        }
      } else {
        res.status(500).send("Vous ne pouvez avoir plus d'un avis par article.");
        return;
      }

      connection.query(sqlUpdate,valuesUpdateArticles,(errorUpdate, resultsUpdate, fields) => {
        if (errorUpdate) {
          res.status(500).send("Une erreur est survenue lors de la mise à jour de la table Articles. " + errorUpdate);
        } else {

          let valuesUpdateUserLikes = [likedOrNot, userId, articleId];
          connection.query(sqlUpdateUserLikes, valuesUpdateUserLikes, (errorUpdateUserLikes, resultsUpdateUserLikes, fields) => {
            if (errorUpdateUserLikes) {
              res.status(500).send("Une erreur est survenue lors de la mise à jour de la table UserLikes. " + errorUpdateUserLikes);
            } else {
              res.status(200).send(message);
            }
          });
        }
      });
    }
  });
};

exports.commentArticle = (req, res, next) => {

  let sqlInsert = `INSERT INTO Commentary (userId, articleId,  com, createAt) VALUES (?,?,?,NOW())`;

  let valuesInsert = [req.body.userId, req.params.id, req.body.com];
  connection.query(sqlInsert, valuesInsert, (errorInsert, resultsFirstInsert, fields) => {
    if (errorInsert) {
      res.status(500).send("Une erreur est survenue lors de l'insertion dans la table Commentary. " + errorInsert);
    } else {
      res.status(201).send("Votre commentaire a bien été ajouté.");
    }
  });
};

exports.getCommentByArticle = (req, res, next) => {
  let sqlSelect = `SELECT * FROM Commentary WHERE articleId = ?`;

  let valuesSelect = [req.params.id];
  connection.query(sqlSelect, valuesSelect, (errorSelect, resultsSelect, fields) => {
    if (errorSelect) {
      res.status(500).send("Une erreur est survenue lors de la jointure entre les tables Articles et Commentary. " + errorSelect);
    } else if (resultsSelect[0] === undefined) {
      res.status(500).send("Il n'y a pas de commentaires.");
    }else {
      res.status(200).json({ resultsSelect });
    }
  });
};

exports.deleteComment = (req, res, next) => {

  let sqlIfExists = `SELECT EXISTS (SELECT id FROM Commentary  WHERE id = ?) AS isTrue`;

  let sqlSelectRank = `SELECT rank FROM Users WHERE userId = ` + mysql.escape(req.body.userId);

  let sqlDelete = ``;

  let valuesDelete = [];

  //if Commentary exist
  let valuesIfExists = [req.params.id];
  connection.query(sqlIfExists, valuesIfExists, (errorIfExists, resultsIfExist, fields) => {
    if (errorIfExists) {
      res.status(500).send("Une erreur est survenue lors du test si il y a un commentaire ou non. " + errorIfExists);
    } else {
      if(resultsIfExist[0].isTrue === 1) {

        connection.query(sqlSelectRank, (errorSelectRank, resultsSelectRank, fields) => {
          if (errorSelectRank) {
            res.status(500).send("Une erreur est survenue lors de la séléction du rang de l'utilisateur. " + errorSelectRank);
          } else {
            if (resultsSelectRank[0].rank === 4) {
              sqlDelete = `DELETE FROM Commentary WHERE id = ?`;
              valuesDelete = [req.params.id];

            } else if(resultsSelectRank[0] !== 4){
              sqlDelete = `DELETE FROM Commentary WHERE userId = ? AND id = ?`;
              valuesDelete = [req.body.userId, req.params.id];
            }
          }

          connection.query(sqlDelete, valuesDelete, (errorDelete, resultsDelete, fields) => {
            if (errorDelete) {
              res.status(500).send("Une erreur est survenue lors de la suppression du commentaire. " + errorDelete);
            } else {
              res.status(200).send("Le commentaire a bien été supprimé.");
            }
          });
        });
      } else {
        res.status(500).send("Ce commentaire n'éxiste pas.");
      }
    }
  });
};
