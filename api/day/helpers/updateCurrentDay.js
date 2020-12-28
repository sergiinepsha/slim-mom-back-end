const dayModel = require('../day.model');

const calculateDaySummary = require('./calculateDaySummary');

module.exports = async function updateCurrentDay(dayId, updatedEatenProducts, daySummary) {
   try {
      const kcal = updatedEatenProducts.reduce((sumCalories, product) => {
         return sumCalories + product.kcal;
      }, 0);

      const updatedDaySummary = calculateDaySummary(kcal, daySummary.dailyRate);
      console.log('dayId', dayId);
      await dayModel.findByIdAndUpdate(dayId, {
         eatenProducts: updatedEatenProducts,
         daySummary: updatedDaySummary,
      });

      return updatedDaySummary;
   } catch (error) {
      throw error;
   }
};
