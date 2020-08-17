const Joi = require('joi');

const middleware = (req, res, next) => {
  const schema = Joi.object({
      firstName: Joi.string()
          .regex(/^[a-zA-Zéèàùüïäëöâêîôû]{3,30}(\s?[a-zA-Zéèàùüïäëöâêîôû]{3,30})*$/i)
          .required(),

      lastName: Joi.string()
          .regex(/^[a-zA-Zéèàùüïäëöâêîôû]{3,30}(\s?[a-zA-Zéèàùüïäëöâêîôû]{3,30})*$/i).required()
          .required(),

      email: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{4,30}@groupomania\.com$'))
          .required(),

      password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
          .required()
  });
    const { value, error } = schema.validate(req.body);
    if(error) {
        res.status(422).send(`${error}`);
    } else {
        next();
    }
};

module.exports = middleware;
