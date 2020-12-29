const mongoose = require('mongoose');
const {
   Schema,
   Types: { ObjectId },
} = require('mongoose');

const emailStatic = require('../auth/handlers/email/emailStatic');
const authStatic = require('../auth/handlers/auth/authStatic');
const userModelStatic = require('./user.model.static');

const user = 'user';

const authConfig = { type: String, required: false };
const statusConfig = {
   type: String,
   required: true,
   enum: ['Verified', 'Created'],
   default: 'Created',
};

const userSchema = new Schema({
   name: { type: String, required: true },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },

   accessToken: { ...authConfig },
   refreshToken: { ...authConfig },
   sid: { ...authConfig },

   status: { ...statusConfig },
   verificationToken: { ...authConfig },

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
userSchema.statics.findUserByIdAndUpdate = authStatic.findUserByIdAndUpdate;
userSchema.statics.findUserByEmail = authStatic.findUserByEmail;
userSchema.statics.updateToken = authStatic.updateToken;
userSchema.statics.updateAccessToken = authStatic.updateAccessToken; //TODO
userSchema.statics.addTokensForUser = authStatic.addTokensForUser; //TODO
//verification of Email
userSchema.statics.createVerificationToken = emailStatic.createVerificationToken;
userSchema.statics.fineByVerificationToken = emailStatic.fineByVerificationToken;
userSchema.statics.verifyUser = emailStatic.verifyUser;

// day
userSchema.statics.findUserByIdAndUpdateDays = userModelStatic.findUserByIdAndUpdateDays;

// daily-rate
userSchema.statics.findUserByIdAndUpdateUserData = userModelStatic.findUserByIdAndUpdateUserData;

const userModel = mongoose.model(user, userSchema);

module.exports = userModel;
