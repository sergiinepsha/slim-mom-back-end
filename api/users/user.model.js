const mongoose = require('mongoose');
const {
   Schema,
   Types: { ObjectId },
} = require('mongoose');

const emailStatic = require('../auth/handlers/email/emailStatic');
const authStatic = require('../auth/handlers/auth/authStatic');

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
   userData: { type: Object },
   // todaySummary: [{ type: ObjectId, ref: 'todaySummary' }], // чтобы можно привязывать id к  данной строке надо использовать  ObjectId
   // user: [{ type: ObjectId, ref: 'user' }],
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

const userModule = mongoose.model(user, userSchema);

module.exports = userModule;
