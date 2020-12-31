const Joi = require('joi');

module.exports = validateCreateUser = (req, res, next) => {
   try {
      const userTemple = Joi.object({
         name: Joi.string().min(3).required(),
         email: Joi.string()
            .min(3)
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pw', 'ua'] } })
            .required(),
         password: Joi.string().min(3),
      });

      const validated = userTemple.validate(req.body);

      if (validated.error) {
         throw new Error(`incorrect ${validated.error.details[0].context.label} or too short`).code(
            400,
         );
      }

      next();
   } catch (error) {
      next(error);
   }
};
