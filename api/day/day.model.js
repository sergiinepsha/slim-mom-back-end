const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const {
   Types: { ObjectId },
} = require('mongoose');

const daySchema = new Schema({
   eatenProducts: { type: Array, required: true },
   date: { type: String, required: true },
   // daySummary: { type: ObjectId, required: true },
});

// MongoDB collection >>> products
const dayModel = mongoose.model('Day', daySchema);

module.exports = dayModel;
