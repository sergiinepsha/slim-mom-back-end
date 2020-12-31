const userModel = require('../users/user.model');
const dayModel = require('./day.model');

const {
   checkEatenProduct,
   updateExistingDay,
   createNewDay,
   updateCurrentDay,
} = require('./helpers');

module.exports = class ProductService {
   static async addProductPerDay(reqBody, reqUser) {
      const { date, productId, weight } = reqBody;
      const userId = reqUser._id;
      const userDays = reqUser.days;
      const dailyRate = reqUser.userData.dailyRate;

      try {
         const eatenProduct = await checkEatenProduct(productId);

         const isSuchDay = await userDays.find(day => day.date === date);

         const currentDay = isSuchDay
            ? updateExistingDay(eatenProduct, weight, isSuchDay.id, dailyRate)
            : createNewDay(eatenProduct, weight, userId, dailyRate, date);

         return currentDay;
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

   static async infoPerDay(date, userId, dailyRate) {
      try {
         const user = await userModel.findById(userId);

         const userDay = user.days.find(day => day.date === date);

         if (userDay) {
            return await dayModel.findById(userDay.id);
         }

         return await createNewDay(null, null, userId, dailyRate, date);
      } catch (error) {
         throw error;
      }
   }
};
