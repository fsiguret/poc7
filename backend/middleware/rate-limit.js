const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100,
    message: "Vous avez éssayé de vous connecter trop de fois. Veuillez rééssayer plus tard."
});
