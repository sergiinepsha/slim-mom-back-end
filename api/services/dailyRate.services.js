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

         if (existingDay) {
            const day = await dayModel.findById(existingDay.id);

            return await updateDaySummary(day, dailyRate);
         }

         return await createNewDay(currentUser, currentDate);
      } catch (error) {
         throw error;
      }
   }
};
