const { checkEatenProduct, updateExistingDay, createNewDay } = require('./helpers');

module.exports = class ProductService {
   static async addProductPerDay(reqBody, reqUser) {
      const { date, productId, weight } = reqBody;
      const userId = reqUser._id;
      const userDays = reqUser.days;
      const dailyRate = reqUser.userData.dailyRate;

      try {
         const eatenProduct = await checkEatenProduct(productId);
         const isSuchDay = userDays.find(day => day.date === date);

         const currentDay = isSuchDay
            ? updateExistingDay(eatenProduct, weight, isSuchDay.dayId, dailyRate)
            : createNewDay(eatenProduct, weight, userId, dailyRate, date);

         return currentDay;
      } catch (error) {
         throw error;
      }
   }
};
