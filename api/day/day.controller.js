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

// async function deleteProductPerDay(req, res, next) {}

async function deleteProductPerDay(req, res, next) {
   try {
      const { dayId, eatenProductId } = req.body;
      const eatenProductsPerDay = await dayModel.findById(dayId);
      const {
         kcalLeft,
         kcalConsumed,
         dailyRate,
         percentsOfDailyRate,
         userId,
      } = eatenProductsPerDay.daySummary;

      //   //   eatenProductsPerDay.eatenProducts.push({ _id: eatenProductId });
      eatenProductsPerDay._doc.eatenProducts.pull({ _id: eatenProductId });
      eatenProductsPerDay.save();
      //   //   console.log(ghg);
      //   console.log(eatenProductsPerDay);
      //   //   await dayModel.findByIdAndUpdate(dayId, eatenProductsPerDay);

      //   const frf = eatenProductsPerDay.eatenProducts.filter(pr => pr._id !== eatenProductId);
      //   console.log(frf);

      const dfg = await dayModel.findOneAndUpdate(
         { _id: dayId },
         { $pull: { eatenProducts: { _id: eatenProductId } } },
         { safe: true },
         function (err, data) {
            if (err) {
               return res.status(500).json({ error: 'error in deleting address' });
            }
            res.json(data);
         },
         //  { new: true },
      );
      console.log(dfg);

      const responseObj = {
         date: eatenProductsPerDay.date,
         kcalLeft,
         kcalConsumed,
         dailyRate,
         percentsOfDailyRate,
         userId,
      };

      //   return res.status(201).send(responseObj);
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
   infoPerDay,
   validateAddProduct,
   validateId,
};
