const dayModel = require('./day.model');
const Joi = require('joi');
const {
   Types: { ObjectId },
} = require('mongoose');

const productModel = require('../products/product.model');
const userModel = require('../users/user.model');

async function addProductPerDay(req, res, next) {
   try {
      const { date, productId, weight } = req.body;
      const eatenProduct = await productModel.findById(productId);
      if (!eatenProduct) {
         return res.status(404).send('Product not found');
      }
      const userId = req.user._id;
      const daySummary = await dayModel.findOne({ date });
      //   если такой день уже записан то обновляем данные
      if (daySummary) {
         daySummary._doc.eatenProducts.push(eatenProduct);
         await dayModel.findByIdAndUpdate(daySummary._doc._id, daySummary);

         req.user._doc.days.push(daySummary._doc._id);
         await userModel.findByIdAndUpdate(userId, req.user);

         const dailyRate = req.user._doc.userData.dailyRate;
         const kcalConsumed = daySummary._doc.eatenProducts.reduce(
            (acc, { calories }) => acc + (calories * weight) / 100,
            0,
         );
         const kcalLeft = dailyRate - kcalConsumed;
         const percentsOfDailyRate = (kcalConsumed / dailyRate) * 100;

         const eatenProductPerDayToClient = {
            eatenProduct,
            day: {
               eatenProducts: daySummary._doc.eatenProducts,
               date,
               daySummary: daySummary._doc._id,
            },
            daySummary: {
               date,
               kcalLeft,
               kcalConsumed,
               dailyRate,
               percentsOfDailyRate,
               userId,
            },
         };

         return res.status(201).send(eatenProductPerDayToClient);
      }

      //   const eatenProducts = [];
      //   eatenProducts.push(eatenProduct);

      const eatenProducts = daySummary ? daySummary._doc.eatenProducts : [eatenProduct];
      const dailyRate = req.user.userData.dailyRate;

      const kcalConsumed = !daySummary
         ? (eatenProduct.calories * weight) / 100
         : eatenProducts.reduce((acc, { calories }) => acc + (calories * weight) / 100, 0);
      const kcalLeft = dailyRate - kcalConsumed;
      const percentsOfDailyRate = (kcalConsumed / dailyRate) * 100;
      // обьект для добавления в day
      const objDayDB = {
         eatenProducts,
         date,
         daySummary: {
            kcalLeft,
            kcalConsumed,
            dailyRate,
            percentsOfDailyRate,
            userId,
         },
      };
      await dayModel.create(objDayDB);
      const dayId = await dayModel.findOne({ date });
      // обьект для добавления в user.days[]
      const day = { id: dayId._id, date };
      const objDayToUser = {
         ...req.user._doc,
         days: [day],
      };

      await userModel.findByIdAndUpdate(userId, objDayToUser);

      const eatenProductPerDayToClient = {
         eatenProduct,
         day: {
            eatenProducts,
            date,
            daySummary: daySummary._id,
         },
         daySummary: {
            date,
            kcalLeft,
            kcalConsumed,
            dailyRate,
            percentsOfDailyRate,
            userId,
         },
      };
      return res.status(201).send(eatenProductPerDayToClient);
   } catch (error) {
      next(error);
   }
}

// async function updateProductPerDay(req, res, next) {
//    try {
//       const updateObj = {};
//    } catch (error) {
//       next(error);
//    }
//    updDayData.daySummary.kcalConsumed = updDayData.day.eatenProducts.reduce(
//       (acc, { calories }) => acc + (calories * weight) / 100,
//       0,
//    );
//    updDayData.daySummary.dailyRate = 2500;
//    updDayData.daySummary.kcalLeft =
//       updDayData.daySummary.dailyRate - updDayData.daySummary.kcalConsumed;
//    updDayData.daySummary.percentsOfDailyRate =
//       (updDayData.daySummary.kcalConsumed / updDayData.daySummary.dailyRate) * 100;
// }

async function deleteProductPerDay(req, res, next) {
   try {
      const { dayId, eatenProductId } = req.body;
      const dayDB = await dayModel.find();

      const dayFind = dayDB.find(day => day._id === dayId);
      console.log(dayFind);
      const updDayData = dayFind;
      updDayData.day.eatenProducts.filter(({ _id }) => _id !== eatenProductId);
      updDayData.daySummary.kcalConsumed = updDayData.day.eatenProducts.reduce(
         (acc, { calories }) => acc + (calories * weight) / 100,
         0,
      );
      updDayData.daySummary.dailyRate = 2500;
      updDayData.daySummary.kcalLeft =
         updDayData.daySummary.dailyRate - updDayData.daySummary.kcalConsumed;
      updDayData.daySummary.percentsOfDailyRate =
         (updDayData.daySummary.kcalConsumed / updDayData.daySummary.dailyRate) * 100;

      const upData = await dayModel.findOneAndUpdate(date, updDayData);

      const res = {
         date: updDayData.day.date,
         kcalLeft: updDayData.daySummary.kcalLeft,
         dailyRate: updDayData.daySummary.dailyRate,
         percentsOfDailyRate: updDayData.daySummary.percentsOfDailyRate,
         userId: '507f1f77bcf86cd799439011',
         id: dayId,
      };

      return res.status(201).send(res);
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
