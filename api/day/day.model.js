const { any } = require('joi');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const {
   Types: { ObjectId },
} = require('mongoose');

// const daySchema = new Schema({
//    eatenProducts: [{ type: Object, required: true }],
//    date: { type: String, required: true },
//    daySummary: { type: Object, required: true },
// });

const daySchema = new Schema({
   eatenProducts: [
      {
         title: { type: String, required: true },
         weight: { type: Number, required: true },
         kcal: { type: Number, required: true },
         _id: { type: ObjectId, required: true },
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

// MongoDB collection >>> products
const dayModel = mongoose.model('Day', daySchema);

module.exports = dayModel;
