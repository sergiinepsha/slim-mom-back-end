const dayModel = require('./day.model');
const Joi = require('joi');
const {
   Types: { ObjectId },
} = require('mongoose');

const ProductService = require('./day.service');

async function addProductPerDay(req, res, next) {
   try {
      const currentDay = await ProductService.addProductPerDay(req.body, req.user);

      return res.status(201).json(currentDay);
   } catch (error) {
      next(error);
   }
}

async function deleteProductPerDay(req, res, next) {
   const { dayId, eatenProductId } = req.body;

   try {
      const daySummary = await ProductService.deleteProductPerDay(dayId, eatenProductId);

      console.log('daySummary', daySummary);
      return res.status(200).json(daySummary);
   } catch (error) {
      next(error);
   }
}

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
   // infoPerDay,
   validateAddProduct,
   validateId,
};
