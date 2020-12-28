const dayModel = require('../day.model');

const calculateEatenProduct = require('./calculateEatenProduct');
const calculateDaySummary = require('./calculateDaySummary');

module.exports = async function updateExistingDay(eatenProduct, weight, dayId, dailyRate) {
   const productCalculated = calculateEatenProduct(eatenProduct, weight);
   console.log('dayId', dayId);
   const updatedDayEatenProducts = await dayModel.findByIdAndUpdate(
      dayId,
      {
         $push: { eatenProducts: productCalculated },
      },
      { new: true },
   );
   console.log('updatedDayEatenProducts', updatedDayEatenProducts);

   const kcal = updatedDayEatenProducts.eatenProducts.reduce((sumCalories, product) => {
      return sumCalories + product.kcal;
   }, 0);

   const daySummary = calculateDaySummary(kcal, dailyRate);

   return await dayModel.findByIdAndUpdate(dayId, { daySummary }, { new: true });
};
