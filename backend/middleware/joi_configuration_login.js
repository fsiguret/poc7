const Joi = require('joi');

const middleware = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{1,30}-?[a-zA-Z0-9]{1,30}@groupomania\.com$'))
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
