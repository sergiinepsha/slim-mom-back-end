'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

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
   notAllowedProducts: { type: Array },
});

daySchema.statics.findDayByIdAndUpdateEatenProducts = findDayByIdAndUpdateEatenProducts;
daySchema.statics.findDayByIdAndUpdateNotAllowedProducts = findDayByIdAndUpdateNotAllowedProducts;
daySchema.statics.findDayByIdAndUpdateDaySummary = findDayByIdAndUpdateDaySummary;
daySchema.statics.findDayByIdAndUpdateEatenProductsAndDaySummary = findDayByIdAndUpdateEatenProductsAndDaySummary;

async function findDayByIdAndUpdateEatenProducts(dayId, productCalculated) {
   try {
      return await this.findByIdAndUpdate(
         dayId,
         {
            $push: { eatenProducts: productCalculated },
         },
         { new: true },
      );
   } catch (error) {
      throw error;
   }
}

async function findDayByIdAndUpdateNotAllowedProducts(dayId, notAllowedProduct) {
   try {
      return await this.findByIdAndUpdate(
         dayId,
         {
            $push: { notAllowedProducts: notAllowedProduct },
         },
         { new: true },
      );
   } catch (error) {
      throw error;
   }
}

async function findDayByIdAndUpdateDaySummary(dayId, daySummary) {
   try {
      return await this.findByIdAndUpdate(dayId, { daySummary }, { new: true });
   } catch (error) {
      throw error;
   }
}

async function findDayByIdAndUpdateEatenProductsAndDaySummary(
   dayId,
   updatedEatenProducts,
   updatedDaySummary,
) {
   try {
      return await this.findByIdAndUpdate(dayId, {
         eatenProducts: updatedEatenProducts,
         daySummary: updatedDaySummary,
      });
   } catch (error) {
      throw error;
   }
}

// MongoDB collection >>> products
const dayModel = mongoose.model('Day', daySchema);

module.exports = dayModel;
