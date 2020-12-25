const dayModel = require('./day.model');
const Joi = require('joi');
const {
   Types: { ObjectId },
} = require('mongoose');

const productModel = require('../products/product.model');

async function addProductPerDay(req, res, next) {
   try {
      const { date, productId, weight } = req.body;

      if (date) {
      }

      const eatenProduct = await productModel.findById(productId);
      console.log(eatenProduct);
      if (!eatenProduct) {
         return res.status(404).send('Product not found');
      }

      const eatenProducts = [eatenProduct];

      const kcalConsumed = eatenProducts.reduce(
         (acc, { calories }) => acc + (calories * weight) / 100,
         0,
      );
      const dailyRate = '';
      const kcalLeft = dailyRate - kcalConsumed;
      const percentsOfDailyRate = (kcalConsumed / dailyRate) * 100;

      const eatenProductPerDay = {
         eatenProduct: { ...eatenProduct },
         day: {
            eatenProducts,
            date,
            daySummary: '',
         },
         daySummary: {
            date,
            kcalLeft,
            kcalConsumed,
            dailyRate,
            percentsOfDailyRate,
            userId: '',
         },
      };

      const respons = await dayModel.create(eatenProductPerDay);

      return res.status(201).send(respons);
   } catch (error) {
      next(error);
   }
}
async function deleteProductPerDay(req, res, next) {}
async function infoPerDay(req, res, next) {}

function validateAddProduct(req, res, next) {
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
function validateId(req, res, next) {
   const { userId } = req.params;
   if (!ObjectId.isValid(userId)) {
      return res.status(400).send();
   }
   next();
}
module.exports = {
   addProductPerDay,
   deleteProductPerDay,
   infoPerDay,
   validateAddProduct,
   validateId,
};
