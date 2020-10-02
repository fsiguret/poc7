const rateLimitCommentary = require('express-rate-limit');

module.exports = rateLimitCommentary({
    windowMs: 0.5 * 60 * 1000, //30 seconds
    max: 1,
    message: "Vous ne pouvez commenter qu'une fois toute les 30 secondes."
});
