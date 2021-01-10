'use strict';

const { calculateDailyRate, updateDaySummary, createNewDay } = require('../helpers');

const dayModel = require('../models/day.model');
const userModel = require('../models/user.model');

module.exports = class DailyRateService {
   static async getDailyRateUser(reqBody, userId) {
      try {
         const dailyRate = calculateDailyRate(reqBody);
         const currentUser = await userModel.findUserByIdAndUpdateUserData(
            userId,
            reqBody,
            dailyRate,
         );

         const currentDate = new Date().toLocaleDateString('fr-ca');

         const existingDay = currentUser.days.find(({ date }) => date === currentDate);

         let currentDay;

         if (existingDay) {
            const day = await dayModel.findById(existingDay.id);

            currentDay = await updateDaySummary(day, dailyRate);

            return currentDay;
         }

         currentDay = await createNewDay(userId, dailyRate, currentDate);

         return currentDay;
      } catch (error) {
         throw error;
      }
   }
};
