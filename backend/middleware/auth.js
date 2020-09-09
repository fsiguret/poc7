const jwtoken = require('jsonwebtoken');
const privateKey = 'DEV_KEY'; //change this for production.

module.exports = (req, res, next) => {

    let token = req.headers.authorization;

    if(token === undefined) {

        res.status(401).send("Vous devez vous connecter.");

    }else {
        token = token.split(' ')[1];
        jwtoken.verify(token, privateKey, function (err, decoded) {
            if(err) {
                res.status(401).send("La session a expirée, veuillez vous reconnecter.");

            }else {
                const decodedToken = jwtoken.verify(token, privateKey)
                const userId = decodedToken.userId;

                const ifFile = (!(req.file === null || req.file === undefined));
                if(!ifFile) {
                    if (req.body.userId && req.body.userId !== userId) {
                        res.status(401).send("Votre userID est invalide.");
                    } else {
                        next();
                    }
                } else if(ifFile) {
                    const objectArticle = JSON.parse(req.body.article);
                    if(objectArticle.userId && objectArticle.userId !== userId) {
                        res.status(401).send("Votre userID est invalide.");
                    } else {
                        next();
                    }
                }
            }
        })
    }
};
