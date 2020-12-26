const mongoose = require('mongoose');
const {
   Schema,
   Types: { ObjectId },
} = require('mongoose');

const { authStatic, emailStatic } = require('./handlers');

const auth = 'auth';

const authConfig = { type: String, required: false };
const statusConfig = {
   type: String,
   required: true,
   enum: ['Verified', 'Created'],
   default: 'Created',
};

const authSchema = new Schema({
   accessToken: { ...authConfig },
   refreshToken: { ...authConfig },
   sid: { ...authConfig },

   status: { ...statusConfig },
   verificationToken: { ...authConfig },

   todaySummary: [{ type: ObjectId, ref: 'todaySummary' }],
   user: [{ type: ObjectId, ref: 'user' }],
});

//auth
authSchema.statics.findUserByIdAndUpdate = authStatic.findUserByIdAndUpdate;
authSchema.statics.findUserByEmail = authStatic.findUserByEmail;
authSchema.statics.updateToken = authStatic.updateToken;
authSchema.statics.updateAccessToken = authStatic.updateAccessToken; //TODO
authSchema.statics.addTokensForUser = authStatic.addTokensForUser; //TODO
//verification of Email
authSchema.statics.createVerificationToken = emailStatic.createVerificationToken;
authSchema.statics.fineByVerificationToken = emailStatic.fineByVerificationToken;
authSchema.statics.verifyUser = emailStatic.verifyUser;

const authModule = mongoose.model(auth, authSchema);

module.exports = authModule;
