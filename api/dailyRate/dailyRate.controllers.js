const { RequestError } = require('../helpers');
const { calculateDailyRate } = require('./helpers');
const DailyRateService = require('./dailyRate.services');

module.exports = class DailyRateControllers {
   static getDailyRate(req, res, next) {
      try {
         const dailyRate = calculateDailyRate(req.body);

         return res.status(200).json({ dailyRate, notAllowedProducts: [] });
      } catch (error) {
         next(new RequestError('Invalid data', 404));
      }
   }

   static async getDailyRateUser(req, res, next) {
      const userId = req.params.userId;

      try {
         const currentDay = await DailyRateService.getDailyRateUser(req.body, userId);
         console.log(currentDay);
         return res.status(200).json(currentDay);
      } catch (error) {
         next(new RequestError('Invalid data', 404));
      }
   }
};
