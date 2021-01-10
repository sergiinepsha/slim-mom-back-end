'use strict';

const Joi = require('joi');

module.exports = class AuthValidator {
   static validateCreateUser(req, res, next) {
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
            const err = new Error(
               `incorrect ${validated.error.details[0].context.label} or too short`,
            );
            err.code = 400;
            throw err;
         }

         next();
      } catch (error) {
         next(error);
      }
   }

   static validateSingIn(req, res, next) {
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
            const err = new Error(`Incorrect  ${validated.error.details[0].context.label}`);
            err.code = 401;
            throw err;
         }

         next();
      } catch (error) {
         next(error);
      }
   }
};
