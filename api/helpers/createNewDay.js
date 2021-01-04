'use strict';

const dayModel = require('../models/day.model');
const userModel = require('../models/user.model');

const calculateEatenProduct = require('./calculateEatenProduct');
const calculateDaySummary = require('./calculateDaySummary');

module.exports = async (userId, dailyRate, date, eatenProduct, weight) => {
   try {
      const productCalculated = eatenProduct ? calculateEatenProduct(eatenProduct, weight) : null;

      const kcal = productCalculated ? productCalculated.kcal : 0;

      const newDay = {
         eatenProducts: productCalculated ? [productCalculated] : [],
         date,
         daySummary: calculateDaySummary(kcal, dailyRate),
      };

      const currentDay = await dayModel.create(newDay);

      await userModel.findUserByIdAndUpdateDays(userId, currentDay);

      return currentDay;
   } catch (error) {
      throw error;
   }
};
