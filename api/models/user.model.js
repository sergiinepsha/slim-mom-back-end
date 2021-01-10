'use strict';

const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },

   accessToken: { type: String },
   refreshToken: { type: String },
   sid: { type: String },

   status: { type: String, required: true, enum: ['Verified', 'Created'], default: 'Created' },
   verificationToken: { type: String },

   userData: {
      weight: { type: Number, required: true, default: 0 },
      height: { type: Number, required: true, default: 0 },
      age: { type: Number, required: true, default: 0 },
      desiredWeight: { type: Number, required: true, default: 0 },
      bloodType: { type: Number, enum: [1, 2, 3, 4], default: 1 },
      dailyRate: { type: Number, required: true, default: 0 },
   },
   days: { type: Array },
});

//auth
userSchema.statics.findUserByIdAndUpdate = findUserByIdAndUpdate;
userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.updateAccessToken = updateAccessToken;
userSchema.statics.addTokensForUser = addTokensForUser;
//verification of Email
userSchema.statics.createVerificationToken = createVerificationToken;
userSchema.statics.fineByVerificationToken = fineByVerificationToken;
userSchema.statics.verifyUser = verifyUser;

// day
userSchema.statics.findUserByIdAndUpdateDays = findUserByIdAndUpdateDays;

// daily-rate
userSchema.statics.findUserByIdAndUpdateUserData = findUserByIdAndUpdateUserData;

// day
async function findUserByIdAndUpdateDays(userId, day) {
   try {
      const { _id, date } = day;

      return await this.findByIdAndUpdate(userId, { $push: { days: { id: _id, date } } });
   } catch (error) {
      throw error;
   }
}

// daily-rate
async function findUserByIdAndUpdateUserData(userId, reqBody, dailyRate) {
   try {
      return await this.findByIdAndUpdate(
         userId,
         { userData: { ...reqBody, dailyRate } },
         { new: true },
      );
   } catch (error) {
      throw error;
   }
}

//auth
async function findUserByIdAndUpdate(userID, newParams) {
   try {
      return await this.findByIdAndUpdate(userID, { $set: newParams }, { new: true });
   } catch (error) {
      throw error;
   }
}

async function updateAccessToken(id, accessToken) {
   try {
      return await this.findByIdAndUpdate(id, { accessToken }, { new: true });
   } catch (error) {
      throw error;
   }
}

async function addTokensForUser(id, accessToken, refreshToken) {
   try {
      return await this.findByIdAndUpdate(
         id,
         { accessToken, refreshToken, sid: id },
         { new: true },
      );
   } catch (error) {
      throw error;
   }
}

async function findUserByEmail(email) {
   try {
      return await this.findOne({ email });
   } catch (error) {
      throw error;
   }
}

//verification of Email
async function createVerificationToken(id, newToken) {
   return await this.findByIdAndUpdate(id, { verificationToken: newToken }, { new: true });
}

async function fineByVerificationToken(verificationToken) {
   return await this.findOne({ verificationToken });
}

async function verifyUser(userID) {
   return await this.findByIdAndUpdate(
      userID,
      {
         status: 'Verified',
         verificationToken: null,
      },
      { new: true },
   );
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
