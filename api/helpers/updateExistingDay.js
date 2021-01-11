'use strict';

const dayModel = require('../models/day.model');

const calculateEatenProduct = require('./calculateEatenProduct');
const updateDaySummary = require('./updateDaySummary');
const isNotAllowedProduct = require('./isNotAllowedProduct');
const isFirstNotAllowedProduct = require('./isFirstNotAllowedProduct');

module.exports = async (currentUser, eatenProduct, weight, dayId) => {
   const { dailyRate, bloodType } = currentUser.userData;

   try {
      const productCalculated = calculateEatenProduct(eatenProduct, weight);

      const notAllowed = isNotAllowedProduct(bloodType, eatenProduct);

      if (notAllowed) {
         const notAllowedProduct = await isFirstNotAllowedProduct(dayId, notAllowed);

         await dayModel.findDayByIdAndUpdateNotAllowedProducts(dayId, notAllowedProduct);
      }

      const updatedDayEatenProducts = await dayModel.findDayByIdAndUpdateEatenProducts(
         dayId,
         productCalculated,
      );

      return await updateDaySummary(updatedDayEatenProducts, dailyRate);
   } catch (error) {
      throw error;
   }
};
