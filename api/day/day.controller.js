const ProductService = require('./day.service');

module.exports = class DayController {
   static async addProductPerDay(req, res, next) {
      try {
         const currentDay = await ProductService.addProductPerDay(req.body, req.user);

         return res.status(201).json(currentDay);
      } catch (error) {
         next(error);
      }
   }

   static async deleteProductPerDay(req, res, next) {
      const { dayId, eatenProductId } = req.body;

      try {
         const daySummary = await ProductService.deleteProductPerDay(dayId, eatenProductId);

         return res.status(200).json(daySummary);
      } catch (error) {
         next(error);
      }
   }

   static async infoPerDay(req, res, next) {
      const userId = req.user._id;
      const { dailyRate } = req.user.userData;
      const { date } = req.body;

      try {
         const dayInfo = await ProductService.infoPerDay(date, userId, dailyRate);

         return res.status(200).json(dayInfo);
      } catch (error) {
         next(error);
      }
   }
};
