'use strict';

const dayModel = require('../models/day.model');
const userModel = require('../models/user.model');

const calculateEatenProduct = require('./calculateEatenProduct');
const calculateDaySummary = require('./calculateDaySummary');
const isNotAllowedProduct = require('./isNotAllowedProduct');

module.exports = async (currentUser, date, eatenProduct, weight) => {
   const { dailyRate, bloodType } = currentUser.userData;
   const userId = currentUser._id;

   try {
      const productCalculated = eatenProduct ? calculateEatenProduct(eatenProduct, weight) : null;

      const notAllowedProduct = eatenProduct ? isNotAllowedProduct(bloodType, eatenProduct) : null;

      const kcal = productCalculated ? productCalculated.kcal : 0;

      const newDay = {
         eatenProducts: productCalculated ? [productCalculated] : [],
         date,
         daySummary: calculateDaySummary(kcal, dailyRate),
         notAllowedProducts: notAllowedProduct ? [notAllowedProduct] : [],
      };

      const currentDay = await dayModel.create(newDay);

      await userModel.findUserByIdAndUpdateDays(userId, currentDay);

      return currentDay;
   } catch (error) {
      throw error;
   }
};
