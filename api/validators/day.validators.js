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

   static validateDeleteProduct(req, res, next) {
      const validationRules = Joi.object({
         dayId: Joi.string().required(),
         eatenProductId: Joi.string().required(),
      });

      const val = validationRules.validate(req.body);

      if (val.error) {
         const err = new Error('Invalid request body');
         err.code = 404;
         throw err;
      }
      next();
   }

   static validateInfoDay(req, res, next) {
      const validationRules = Joi.object({
         date: Joi.date().required(),
      });

      const val = validationRules.validate(req.body);

      if (val.error) {
         const err = new Error('Invalid request body');
         err.code = 404;
         throw err;
      }
      next();
   }

   static validateProductId(req, res, next) {
      const { productId } = req.body;

      checkedId(productId);

      next();
   }

   static validateAllIds(req, res, next) {
      const { dayId, eatenProductId } = req.body;

      checkedId(dayId);

      checkedId(eatenProductId);

      next();
   }
};
