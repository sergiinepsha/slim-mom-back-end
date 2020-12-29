const dayModel = require('../day.model');

const calculateDaySummary = require('./calculateDaySummary');

module.exports = async function updateDaySummary(day, dailyRate) {
   const { _id, eatenProducts } = day;

   const kcal = eatenProducts.reduce((sumCalories, product) => {
      return sumCalories + product.kcal;
   }, 0);

   const daySummary = calculateDaySummary(kcal, dailyRate);

   return await dayModel.findDayByIdAndUpdateDaySummary(_id, daySummary);
};
