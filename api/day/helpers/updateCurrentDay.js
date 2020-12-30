const dayModel = require('../day.model');

const calculateDaySummary = require('./calculateDaySummary');

module.exports = {
   updateCurrentDay: async (dayId, updatedEatenProducts, daySummary) => {
      try {
         const kcal = updatedEatenProducts.reduce((sumCalories, product) => {
            return sumCalories + product.kcal;
         }, 0);

         const updatedDaySummary = calculateDaySummary(kcal, daySummary.dailyRate);

         await dayModel.findDayByIdAndUpdateEatenProductsAndDaySummary(
            dayId,
            updatedEatenProducts,
            updatedDaySummary,
         );

         return updatedDaySummary;
      } catch (error) {
         throw error;
      }
   },
};
