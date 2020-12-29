const dayModel = require('../day.model');
const userModel = require('../../users/user.model');

const calculateEatenProduct = require('./calculateEatenProduct');
const calculateDaySummary = require('./calculateDaySummary');

module.exports = async function createNewDay(eatenProduct, weight, userId, dailyRate, date) {
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
};
