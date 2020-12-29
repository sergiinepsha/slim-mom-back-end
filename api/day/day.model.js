const mongoose = require('mongoose');
const { Schema } = mongoose;

const dayModelStatic = require('./day.model.static');

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

daySchema.statics.findDayByIdAndUpdateEatenProducts =
   dayModelStatic.findDayByIdAndUpdateEatenProducts;
daySchema.statics.findDayByIdAndUpdateDaySummary = dayModelStatic.findDayByIdAndUpdateDaySummary;
daySchema.statics.findDayByIdAndUpdateEatenProductsAndDaySummary =
   dayModelStatic.findDayByIdAndUpdateEatenProductsAndDaySummary;

// MongoDB collection >>> products
const dayModel = mongoose.model('Day', daySchema);

module.exports = dayModel;
