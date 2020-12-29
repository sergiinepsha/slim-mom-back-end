const dayModel = require('../day.model');

const calculateEatenProduct = require('./calculateEatenProduct');
const calculateDaySummary = require('./calculateDaySummary');

module.exports = async function updateExistingDay(eatenProduct, weight, dayId, dailyRate) {
   const productCalculated = calculateEatenProduct(eatenProduct, weight);

   const updatedDayEatenProducts = await dayModel.findDayByIdAndUpdateEatenProducts(
      dayId,
      productCalculated,
   );

   const kcal = updatedDayEatenProducts.eatenProducts.reduce((sumCalories, product) => {
      return sumCalories + product.kcal;
   }, 0);

   const daySummary = calculateDaySummary(kcal, dailyRate);

   return await dayModel.findDayByIdAndUpdateDaySummary(dayId, daySummary);
};
