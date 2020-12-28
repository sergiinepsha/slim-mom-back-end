module.exports = function calculateDaySummary(kcal, dailyRate) {
   return {
      kcalLeft: dailyRate - kcal,
      kcalConsumed: kcal,
      dailyRate,
      percentsOfDailyRate: (kcal / dailyRate) * 100,
   };
};
