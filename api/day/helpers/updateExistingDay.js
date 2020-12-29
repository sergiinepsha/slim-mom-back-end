const dayModel = require('../day.model');

const calculateEatenProduct = require('./calculateEatenProduct');
const updateDaySummary = require('./updateDaySummary');

module.exports = async function updateExistingDay(eatenProduct, weight, dayId, dailyRate) {
   const productCalculated = calculateEatenProduct(eatenProduct, weight);

   const updatedDayEatenProducts = await dayModel.findDayByIdAndUpdateEatenProducts(
      dayId,
      productCalculated,
   );

   return updateDaySummary(updatedDayEatenProducts, dailyRate);
};
