async function findDayByIdAndUpdateEatenProducts(dayId, productCalculated) {
   return await this.findByIdAndUpdate(
      dayId,
      {
         $push: { eatenProducts: productCalculated },
      },
      { new: true },
   );
}

async function findDayByIdAndUpdateDaySummary(dayId, daySummary) {
   return await this.findByIdAndUpdate(dayId, { daySummary }, { new: true });
}

async function findDayByIdAndUpdateEatenProductsAndDaySummary(
   dayId,
   updatedEatenProducts,
   updatedDaySummary,
) {
   return await this.findByIdAndUpdate(dayId, {
      eatenProducts: updatedEatenProducts,
      daySummary: updatedDaySummary,
   });
}

module.exports = {
   findDayByIdAndUpdateEatenProducts,
   findDayByIdAndUpdateDaySummary,
   findDayByIdAndUpdateEatenProductsAndDaySummary,
};
