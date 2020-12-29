const Joi = require('joi');

module.exports = class DayValidator {
   static validateAddProduct(req, res, next) {
      const validationRules = Joi.object({
         date: Joi.date().required(),
         productId: Joi.string().required(),
         weight: Joi.number().required(),
      });
      const val = validationRules.validate(req.body);
      if (val.error) {
         return res.status(400).send('invalid request body');
      }
      next();
   }
};
