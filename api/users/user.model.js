const mongoose = require('mongoose');
const {
   Schema,
   Types: { ObjectId },
} = require('mongoose');
const authSchema = require('./auth/data/authSchema');
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

   // todaySummary: [{ type: ObjectId, ref: 'todaySummary' }], // чтобы можно привязывать id к  данной строке надо использовать  ObjectId
});
//auth
userSchema.statics.findUserByIdAndUpdate = authSchema.findUserByIdAndUpdate;
userSchema.statics.findUserByEmail = authSchema.findUserByEmail;
userSchema.statics.updateToken = authSchema.updateToken;
userSchema.statics.updateAccessToken = authSchema.updateAccessToken; //TODO
userSchema.statics.addTokensForUser = authSchema.addTokensForUser; //TODO
//verification of Email
userSchema.statics.createVerificationToken = authSchema.createVerificationToken;
userSchema.statics.fineByVerificationToken = authSchema.fineByVerificationToken;
userSchema.statics.verifyUser = authSchema.verifyUser;

const userModule = mongoose.model(user, userSchema);

module.exports = userModule;
