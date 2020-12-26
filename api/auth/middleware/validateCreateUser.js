const Joi = require('joi');

const { RequestError } = require('../../helpers');

async function validateCreateUser(req, res, next) {
   try {
      const userTemple = await Joi.object({
         name: Joi.string().min(3).required(),
         email: Joi.string()
            .min(3)
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pw', 'ua'] } })
            .required(),
         password: Joi.string().min(3),
      });

      const validated = await userTemple.validate(req.body);

      if (validated.error) {
         throw new RequestError(validated.error.details[0].context.label, 400);
      }

      next();
   } catch (error) {
      next(error);
   }
}

module.exports = validateCreateUser;
