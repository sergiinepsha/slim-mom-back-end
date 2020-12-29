const mongoose = require('mongoose');
const { Schema } = mongoose;

const daySchema = new Schema({
   eatenProducts: [
      {
         title: { type: String, required: true },
         weight: { type: Number, required: true },
         kcal: { type: Number, required: true },
      },
   ],
   date: { type: String, required: true },
   daySummary: {
      kcalLeft: { type: Number, required: true },
      kcalConsumed: { type: Number, required: true },
      dailyRate: { type: Number, required: true },
      percentsOfDailyRate: { type: Number, required: true },
   },
});

daySchema.statics.findDayByIdAndUpdateEatenProducts = findDayByIdAndUpdateEatenProducts;
daySchema.statics.findDayByIdAndUpdateDaySummary = findDayByIdAndUpdateDaySummary;
daySchema.statics.findDayByIdAndUpdateEatenProductsAndDaySummary = findDayByIdAndUpdateEatenProductsAndDaySummary;

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

// MongoDB collection >>> products
const dayModel = mongoose.model('Day', daySchema);

module.exports = dayModel;
