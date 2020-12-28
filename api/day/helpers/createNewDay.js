const dayModel = require('../day.model');
const userModel = require('../../users/user.model');

const calculateEatenProduct = require('./calculateEatenProduct');
const calculateDaySummary = require('./calculateDaySummary');

module.exports = async function createNewDay(eatenProduct, weight, userId, dailyRate, date) {
   const productCalculated = calculateEatenProduct(eatenProduct, weight);

   const newDay = {
      eatenProducts: [productCalculated],
      date,
      daySummary: calculateDaySummary(productCalculated.kcal, dailyRate),
   };

   const currentDay = await dayModel.create(newDay);
   const dayId = currentDay._id;

   await userModel.findByIdAndUpdate(userId, {
      $push: { days: { dayId, date } },
   });
   return currentDay;
};