const mongoose = require('mongoose');

const { Schema } = mongoose;

const dailyRateSchema = new Schema({
   dailyRate: { type: Number, required: true },
   summaries: [
      {
         date: { type: String, required: true },
         kcalLeft: { type: Number, required: true },
         kcalConsumed: { type: Number, required: true },
         dailyRate: { type: Number, required: true },
         percentsOfDailyRate: { type: Number, required: true },
         userId: { type: String, required: true },
      },
   ],
   notAllowedProducts: [[{ type: String, required: true }]],
});

const dailyRateModel = mongoose.model('DailyRate', dailyRateSchema);

module.exports = dailyRateModel;
