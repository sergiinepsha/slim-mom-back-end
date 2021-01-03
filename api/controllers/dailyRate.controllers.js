'use strict';

const { calculateDailyRate } = require('../helpers');
const DailyRateService = require('../services/dailyRate.services');

module.exports = class DailyRateControllers {
   static getDailyRate(req, res, next) {
      try {
         const dailyRate = calculateDailyRate(req.body);

         return res.status(200).json({ dailyRate, notAllowedProducts: [] });
      } catch (error) {
         next(error);
      }
   }

   static async getDailyRateUser(req, res, next) {
      const userId = req.params.userId;

      try {
         const currentDay = await DailyRateService.getDailyRateUser(req.body, userId);

         return res.status(200).json(currentDay);
      } catch (error) {
         next(error);
      }
   }
};
