const Joi = require('joi');
const {
   Types: { ObjectId },
} = require('mongoose');

const { RequestError } = require('../helpers');

module.exports = class DailyRateValidators {
   static validateGetDailyRate(req, res, next) {
      const validationRules = Joi.object({
         weight: Joi.number().required(),
         height: Joi.number().required(),
         age: Joi.number().required(),
         desiredWeight: Joi.number().required(),
         bloodType: Joi.number().required(),
      });
      const val = validationRules.validate(req.body);
      if (val.error) {
         throw new RequestError('Invalid data', 404);
      }
      next();
   }

   static validateId(req, res, next) {
      const { userId } = req.params;

      if (!ObjectId.isValid(userId)) {
         throw new RequestError('Invalid id', 404);
      }
      next();
   }
};
