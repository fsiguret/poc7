const Joi = require('joi');

const middleware = (req, res, next) => {
  const schema = Joi.object({
      firstName: Joi.string()
          .regex(/^[a-zA-Zéèàùüïäëöâêîôû]{3,30}(\s?-?[a-zA-Zéèàùüïäëöâêîôû]{3,30})*$/i)
          .required(),

      lastName: Joi.string()
          .regex(/^[a-zA-Zéèàùüïäëöâêîôû]{3,30}(\s?[a-zA-Zéèàùüïäëöâêîôû]{3,30})*$/i).required()
          .required(),

      email: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{1,30}-?[a-zA-Z0-9]{1,30}@groupomania\.com$'))
          .required(),

      password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
          .required()
  });
    const { value, error } = schema.validate(req.body);
    if(error) {
        if (error.details[0].context.key === "firstName") {
            res.status(422).send("Le prénom ne peut contenir que des caractères alpha-numériques (ex: Paul, Jean-Paul)");
        } else if (error.details[0].context.key === "lastName") {
            res.status(422).send("Le nom ne peut contenir que des caractères alpha-numériques (ex: Appert, Pinet)");
        } else if (error.details[0].context.key === "email") {
            res.status(422).send("L'adresse électronique doit contenir un @ suivis du nom de domaine groupomania.com (ex: utilisateur@groupomania.com)");
        } else if (error.details[0].context.key === "password") {
            res.status(422).send("Les caractères spéciaux et accents sont interdit, minimum 3 caractères et maximum 30.");
        }
    } else {
        next();
    }
};

module.exports = middleware;
