'use strict';

const Joi = require('joi');

const { checkedId } = require('../helpers');

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
         const err = new Error('Invalid data');
         err.code = 404;
         throw err;
      }

      next();
   }

   static validateId(req, res, next) {
      const { userId } = req.params;

      checkedId(userId);

      next();
   }
};
