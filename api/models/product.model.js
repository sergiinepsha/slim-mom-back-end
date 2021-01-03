'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
   categories: [{ type: String }],
   weight: { type: Number, required: true },
   title: {
      ru: { type: String, required: true },
      ua: { type: String, required: true },
   },
   calories: { type: Number, required: true },
   groupBloodNotAllowed: {
      1: { type: Boolean, required: true },
      2: { type: Boolean, required: true },
      3: { type: Boolean, required: true },
      4: { type: Boolean, required: true },
   },
});

// MongoDB collection >>> products
const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;
