const Joi = require('joi');

module.exports = validateSingIn = (req, res, next) => {
   try {
      const userTemple = Joi.object({
         email: Joi.string()
            .min(3)
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pw'] } }) // валидация мыла
            .required(),
         password: Joi.string().min(3),
      });

      const validated = userTemple.validate(req.body);

      if (validated.error) {
         throw new Error(`Incorrect  ${validated.error.details[0].context.label}`).code(401);
      }

      next();
   } catch (error) {
      next(error);
   }
};
