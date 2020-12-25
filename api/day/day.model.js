const mongoose = require('mongoose');
const { Schema } = mongoose;

const daySchema = new Schema({
   date: { type: Date, required: true },
   daySummary: { type: ObjectId, required: true },
   eatenProducts: [{ type: ObjectId, required: true }],
});

// MongoDB collection >>> products
const dayModel = mongoose.model('Day', daySchema);

module.exports = dayModel;
