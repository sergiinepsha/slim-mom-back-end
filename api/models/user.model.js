'use strict';

const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userModelStatic = require('./user.model.static');

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
userSchema.statics.findUserByIdAndUpdate = userModelStatic.findUserByIdAndUpdate;
userSchema.statics.findUserByEmail = userModelStatic.findUserByEmail;
userSchema.statics.updateAccessToken = userModelStatic.updateAccessToken;
userSchema.statics.addTokensForUser = userModelStatic.addTokensForUser;
//verification of Email
userSchema.statics.createVerificationToken = userModelStatic.createVerificationToken;
userSchema.statics.fineByVerificationToken = userModelStatic.fineByVerificationToken;
userSchema.statics.verifyUser = userModelStatic.verifyUser;

// day
userSchema.statics.findUserByIdAndUpdateDays = userModelStatic.findUserByIdAndUpdateDays;

// daily-rate
userSchema.statics.findUserByIdAndUpdateUserData = userModelStatic.findUserByIdAndUpdateUserData;

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
