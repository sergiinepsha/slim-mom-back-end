'use strict';

async function findDayByIdAndUpdateEatenProducts(dayId, productCalculated) {
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
}

async function findDayByIdAndUpdateDaySummary(dayId, daySummary) {
   try {
      return await this.findByIdAndUpdate(dayId, { daySummary }, { new: true });
   } catch (error) {
      throw error;
   }
}

async function findDayByIdAndUpdateEatenProductsAndDaySummary(
   dayId,
   updatedEatenProducts,
   updatedDaySummary,
) {
   try {
      return await this.findByIdAndUpdate(dayId, {
         eatenProducts: updatedEatenProducts,
         daySummary: updatedDaySummary,
      });
   } catch (error) {
      throw error;
   }
}

module.exports = {
   findDayByIdAndUpdateEatenProducts,
   findDayByIdAndUpdateDaySummary,
   findDayByIdAndUpdateEatenProductsAndDaySummary,
};
