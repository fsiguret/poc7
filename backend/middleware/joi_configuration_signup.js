const Joi = require('joi');

const middleware = (req, res, next) => {
  const schema = Joi.object().keys({
      email: Joi.string().regex(/^[a-zA-Z0-9]{4,30}@groupomania\.com$/).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{4,30}$/).required()
  });
    Joi.validate(req.body, schema,(err, value) => {
        if(err) {
            res.status(422).send(`${err}`);
        } else {
            next();
        }
    });
};

module.exports = middleware;
