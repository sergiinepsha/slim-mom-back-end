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
      const dailyRate = req.user._doc.userData.dailyRate;
      const daySummary = await dayModel.findOne({ date });

      if (daySummary) {
         daySummary._doc.eatenProducts.push(eatenProduct);
      }

      const eatenProducts = daySummary ? daySummary._doc.eatenProducts : [eatenProduct];
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

      daySummary
         ? await dayModel.findByIdAndUpdate(daySummary._doc._id, objDayDB)
         : await dayModel.create(objDayDB);

      const dayId = await dayModel.findOne({ date });
      const dayArrToUser = await dayModel.find();

      req.user._doc.days = dayArrToUser.map(day => {
         return { id: day._id, date: day.date };
      });
      const ggg = { ...req.user._doc };

      await userModel.findByIdAndUpdate(userId, ggg);

      const eatenProductPerDayToClient = {
         eatenProduct,
         day: {
            eatenProducts,
            date,
            daySummary: dayId._id,
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

async function deleteProductPerDay(req, res, next) {
   try {
      const { dayId, eatenProductId } = req.body;
      const dayFind = await dayModel.findById(dayId);

      const AlleatenProducts = [...dayFind.eatenProducts];
      //   const eatenProductsAfterDel = AlleatenProducts.filter(({ _id }) => {
      //      console.log(_id);
      //      console.log(eatenProductId);
      //      return _id !== eatenProductId;
      //   });
      //   console.log('sdgdfgdfg', eatenProductsAfterDel);

      //   await dayModel.findByIdAndUpdate(dayId, findDay);

      const response = {
         date: dayFind.date,
         kcalLeft: dayFind.daySummary.kcalLeft,
         dailyRate: dayFind.daySummary.dailyRate,
         percentsOfDailyRate: dayFind.daySummary.percentsOfDailyRate,
         userId: dayFind.daySummary.userId,
         id: dayId,
      };

      return res.status(201).send(response);
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
