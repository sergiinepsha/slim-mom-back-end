const Joi = require('joi');

const { RequestError } = require('../../helpers');

module.exports = validateSingIn = async (req, res, next) => {
   try {
      const userTemple = await Joi.object({
         email: Joi.string()
            .min(3)
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pw'] } }) // валидация мыла
            .required(),
         password: Joi.string().min(3),
      });

      const validated = await userTemple.validate(req.body);

      if (validated.error) {
         throw new RequestError(`Incorrect  ${validated.error.details[0].context.label}`, 401);
      }

      next();
   } catch (error) {
      next(error);
   }
};
