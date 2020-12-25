const dailyRateModel = require('./dailyRate.model');
const Joi = require('joi');
const {
   Types: { ObjectId },
} = require('mongoose');

async function dailyRate(req, res, next) {
   try {
      const userId = req.params.userId;
      const { weight, height, age, desiredWeight, bloodType } = req.body;
      const dailyRate =
         10 * weight + 6.25 * height - 5 * age - 161 - 10 * (weight - desiredWeight) + bloodType;

      if (!userId) {
         const dailyRateData = { dailyRate, notAllowedProducts: [] };
         return res.status(200).send(dailyRateData);
      }

      const dailyRateData_withID = {
         id: '12',
         dailyRate,
         summaries: [
            {
               //    _id: '12',
               date: '12',
               kcalLeft: 1,
               kcalConsumed: 12,
               dailyRate: 12,
               percentsOfDailyRate: 2,
               userId: userId,
               //    __v: 0,
            },
         ],
         notAllowedProducts: [['Яйцо куриное (желток сухой)']],
      };
      console.log(dailyRateData_withID);

      const fromDataBase = await dailyRateModel.create(dailyRateData_withID);
      //   const { _id, __v } = fromDataBase;
      console.log(fromDataBase);

      //   dailyRateData_withID.summaries;

      //   const listProducts = await dailyRateModel.find();
      //   console.log(listProducts);

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
