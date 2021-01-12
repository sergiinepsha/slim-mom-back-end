'use strict';

const DayService = require('../services/day.service');

module.exports = class DayController {
   static async addProductPerDay(req, res, next) {
      try {
         const currentDay = await DayService.addProductPerDay(req.body, req.user);

         return res.status(201).json(currentDay);
      } catch (error) {
         next(error);
      }
   }

   static async deleteProductPerDay(req, res, next) {
      const { dayId, eatenProductId } = req.body;

      try {
         const daySummary = await DayService.deleteProductPerDay(dayId, eatenProductId);

         return res.status(201).json(daySummary);
      } catch (error) {
         next(error);
      }
   }

   static async infoPerDay(req, res, next) {
      const { date } = req.body;

      try {
         const dayInfo = await DayService.infoPerDay(date, req.user);

         return res.status(200).json(dayInfo);
      } catch (error) {
         next(error);
      }
   }
};
