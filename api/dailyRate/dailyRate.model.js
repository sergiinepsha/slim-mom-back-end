const mongoose = require('mongoose');

const { Schema } = mongoose;

const dailyRateSchema = new Schema({
   //    weight: { type: Number, required: true },
   //    height: { type: Number, required: true },
   //    age: { type: Number, required: true },
   //    desiredWeight: { type: Number, required: true },
   //    bloodType: { type: Number, required: true, default: 1 },
   //    token: { type: String, required: false },

   id: { type: String, required: true },
   dailyRate: { type: Number, required: true },
   summaries: [
      {
         //  _id: { type: Number, required: true },
         date: { type: String, required: true },
         kcalLeft: { type: Number, required: true },
         kcalConsumed: { type: Number, required: true },
         dailyRate: { type: Number, required: true },
         percentsOfDailyRate: { type: Number, required: true },
         userId: { type: String, required: true },
         //  __v: { type: Number, required: true },
      },
   ],
   notAllowedProducts: [[{ type: String, required: true }]],
});

const dailyRateModel = mongoose.model('DailyRate', dailyRateSchema);

module.exports = dailyRateModel;
