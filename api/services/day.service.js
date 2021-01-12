'use strict';

const userModel = require('../models/user.model');
const dayModel = require('../models/day.model');

const {
   checkEatenProduct,
   updateExistingDay,
   createNewDay,
   updateCurrentDay,
} = require('../helpers');

module.exports = class ProductService {
   static async addProductPerDay(reqBody, currentUser) {
      const { date, productId, weight } = reqBody;
      const userDays = currentUser.days;

      try {
         const eatenProduct = await checkEatenProduct(productId);

         const isSuchDay = await userDays.find(day => day.date === date);

         if (isSuchDay) {
            return updateExistingDay(currentUser, eatenProduct, weight, isSuchDay.id);
         }

         return createNewDay(currentUser, date, eatenProduct, weight);
      } catch (error) {
         throw error;
      }
   }

   static async deleteProductPerDay(dayId, eatenProductId) {
      try {
         const currentDay = await dayModel.findById(dayId);

         const { eatenProducts, daySummary } = currentDay;

         const updatedEatenProducts = eatenProducts.filter(product => {
            return String(product._id) !== eatenProductId;
         });

         return updateCurrentDay(dayId, updatedEatenProducts, daySummary);
      } catch (error) {
         throw error;
      }
   }

   static async infoPerDay(date, currentUser) {
      const userId = currentUser._id;

      try {
         const user = await userModel.findById(userId);

         const userDay = user.days.find(day => day.date === date);

         if (userDay) {
            return await dayModel.findById(userDay.id);
         }

         return await createNewDay(currentUser, date);
      } catch (error) {
         throw error;
      }
   }
};
