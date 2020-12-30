module.exports = {
   findDayByIdAndUpdateEatenProducts: async (dayId, productCalculated) => {
      try {
         return await this.findByIdAndUpdate(
            dayId,
            {
               $push: { eatenProducts: productCalculated },
            },
            { new: true },
         );
      } catch (error) {
         throw error;
      }
   },

   findDayByIdAndUpdateDaySummary: async (dayId, daySummary) => {
      try {
         return await this.findByIdAndUpdate(dayId, { daySummary }, { new: true });
      } catch (error) {
         throw error;
      }
   },

   findDayByIdAndUpdateEatenProductsAndDaySummary: async (
      dayId,
      updatedEatenProducts,
      updatedDaySummary,
   ) => {
      try {
         return await this.findByIdAndUpdate(dayId, {
            eatenProducts: updatedEatenProducts,
            daySummary: updatedDaySummary,
         });
      } catch (error) {
         throw error;
      }
   },
};
