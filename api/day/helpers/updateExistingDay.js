const dayModel = require('../day.model');

const calculateEatenProduct = require('./calculateEatenProduct');
const updateDaySummary = require('./updateDaySummary');

module.exports = updateExistingDay = async (eatenProduct, weight, dayId, dailyRate) => {
   try {
      const productCalculated = calculateEatenProduct(eatenProduct, weight);

      const updatedDayEatenProducts = await dayModel.findDayByIdAndUpdateEatenProducts(
         dayId,
         productCalculated,
      );

      return updateDaySummary(updatedDayEatenProducts, dailyRate);
   } catch (error) {
      throw error;
   }
};
