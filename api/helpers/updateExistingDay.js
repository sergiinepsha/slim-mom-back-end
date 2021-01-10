'use strict';

const dayModel = require('../models/day.model');

const calculateEatenProduct = require('./calculateEatenProduct');
const updateDaySummary = require('./updateDaySummary');

module.exports = async (eatenProduct, weight, dayId, dailyRate) => {
   try {
      const productCalculated = calculateEatenProduct(eatenProduct, weight);

      const updatedDayEatenProducts = await dayModel.findDayByIdAndUpdateEatenProducts(
         dayId,
         productCalculated,
      );

      return await updateDaySummary(updatedDayEatenProducts, dailyRate);
   } catch (error) {
      throw error;
   }
};
