'use strict';

const Joi = require('joi');

const { checkedId } = require('../helpers');

module.exports = class DayValidator {
   static validateAddProduct(req, res, next) {
      const validationRules = Joi.object({
         date: Joi.date().required(),
         productId: Joi.string().required(),
         weight: Joi.number().required(),
      });

      const val = validationRules.validate(req.body);

      if (val.error) {
         const err = new Error('Invalid request body');
         err.code = 404;
         throw err;
      }
      next();
   }

   static validateId(req, res, next) {
      const { productId } = req.body;

      checkedId(productId);

      next();
   }
};
