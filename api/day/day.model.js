const mongoose = require('mongoose');
const { Schema } = mongoose;
const {
   Types: { ObjectId },
} = require('mongoose');

const daySchema = new Schema({
   eatenProduct: { type: Object, required: true },
   day: { type: Object, required: true },
   daySummary: { type: Object, required: true },
});

// MongoDB collection >>> products
const dayModel = mongoose.model('Day', daySchema);

module.exports = dayModel;
