const mongoose = require('mongoose');

const { Schema } = mongoose;

const dailyRateSchema = new Schema({
   weight: { type: Number, required: true },
   height: { type: Number, required: true },
   age: { type: Number, required: true },
   desiredWeight: { type: Number, required: true },
   bloodType: { type: Number, required: true, default: 1 },
});

const dailyRateModel = mongoose.model('Contact', dailyRateSchema);

module.exports = dailyRateModel;
