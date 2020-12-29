const { RequestError } = require('../helpers');
const { calculateDailyRate } = require('./helpers');
const DailyRateService = require('./dailyRate.services');

module.exports = class DailyRateControllers {
   static getDailyRate(req, res, next) {
      try {
         const dailyRate = calculateDailyRate(req.body);

         return res.status(200).json(dailyRate);
      } catch (error) {
         next(new RequestError('Invalid data', 404));
      }
   }

   static async getDailyRateUser(req, res, next) {
      const userId = req.params.userId;

      try {
         const daySummary = await DailyRateService.getDailyRateUser(req.body, userId);

         return res.status(200).json(daySummary);
      } catch (error) {
         next(new RequestError('Invalid data', 404));
      }
   }
};
