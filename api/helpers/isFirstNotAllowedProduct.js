'use strict';

const dayModel = require('../models/day.model');

module.exports = async (dayId, notAllowedProduct) => {
   try {
      const currentDay = await dayModel.findById(dayId);

      if (currentDay.notAllowedProducts.length > 0) {
         return notAllowedProduct.toLowerCase();
      }

      return notAllowedProduct;
   } catch (error) {
      throw error;
   }
};
