'use strict';

const dayModel = require('../models/day.model');

const calculateDaySummary = require('./calculateDaySummary');

module.exports = async (day, dailyRate) => {
   try {
      const { _id, eatenProducts } = day;

      const kcal = eatenProducts.reduce((sumCalories, product) => {
         return sumCalories + product.kcal;
      }, 0);

      const daySummary = calculateDaySummary(kcal, dailyRate);

      return await dayModel.findDayByIdAndUpdateDaySummary(_id, daySummary);
   } catch (error) {
      throw error;
   }
};
