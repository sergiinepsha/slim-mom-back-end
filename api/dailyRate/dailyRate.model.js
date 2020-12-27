const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const dailyRateSchema = new Schema({
   dailyRate: { type: Number, required: true },
   summaries: [],
   notAllowedProducts: [[{ type: String, required: true }]],
});

const dailyRateModel = mongoose.model('DailyRate', dailyRateSchema);

module.exports = dailyRateModel;
