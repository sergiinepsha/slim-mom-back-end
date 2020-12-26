const dailyRateModel = require('./dailyRate.model');
const Joi = require('joi');
const {
   Types: { ObjectId },
} = require('mongoose');

const productModel = require('../products/product.model');

async function dailyRate(req, res, next) {
   try {
      const userId = req.params.userId;
      const { weight, height, age, desiredWeight, bloodType } = req.body;
      const dailyRate = 10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desiredWeight);

      const listProducts = await productModel.find();
      const random = Math.floor(Math.random() * listProducts.length);
      const randomProduct = listProducts[random].title.ru;

      if (!userId) {
         const dailyRateData = { dailyRate, notAllowedProducts: [randomProduct] };
         return res.status(200).send(dailyRateData);
      }

      const date = new Date().toLocaleDateString('fr-ca');

      const dailyRateData_withID = {
         dailyRate,
         summaries: [
            {
               date,
               kcalLeft: 1,
               kcalConsumed: 12,
               dailyRate: 12,
               percentsOfDailyRate: 2,
               userId: userId,
            },
         ],
         notAllowedProducts: [[randomProduct]],
      };

      const fromDataBase = await dailyRateModel.create(dailyRateData_withID);

      return res.status(200).send(fromDataBase);
   } catch (error) {
      next(error);
   }
}

function validateDailyRate(req, res, next) {
   const validationRules = Joi.object({
      weight: Joi.number().required(),
      height: Joi.number().required(),
      age: Joi.number().required(),
      desiredWeight: Joi.number().required(),
      bloodType: Joi.number().required(),
   });
   const val = validationRules.validate(req.body);
   if (val.error) {
      return res.status(400).send('invalid request body');
   }
   next();
}
function validateId(req, res, next) {
   const { userId } = req.params;
   if (!ObjectId.isValid(userId)) {
      return res.status(400).send();
   }
   next();
}

module.exports = { dailyRate, validateDailyRate, validateId };
