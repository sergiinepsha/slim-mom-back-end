const mongoose = require('mongoose');
const {
   Schema,
   Types: { ObjectId },
} = require('mongoose');

const user = 'user';

const defaultConfig = { type: String, required: true };
const authConfig = { type: String, required: false };
const subscriptionConfig = { type: String, enum: ['free', 'pro'], default: 'free' };
const statusConfig = {
   type: String,
   required: true,
   enum: ['Verified', 'Created'],
   default: 'Created',
};
const userSchema = new Schema({
   name: { ...defaultConfig },
   email: { ...defaultConfig, unique: true },
   password: { ...defaultConfig },
   token: { ...authConfig },
   subscription: { ...subscriptionConfig },

   status: { ...statusConfig },
   verificationToken: { ...authConfig },

   favoriteFilmIds: [{ type: ObjectId, ref: 'product' }], // чтобы можно привязывать id к  данной строке надо использовать  ObjectId
});

userSchema.statics.findUserByIdAndUpdate = findUserByIdAndUpdate;
userSchema.statics.findUserByEmail = findUserByEmail;
userSchema.statics.updateToken = updateToken;

async function findUserByIdAndUpdate(userID, newParams) {
   return await this.findByIdAndUpdate(userID, { $set: newParams }, { new: true });
}
async function updateToken(id, newToken) {
   return await this.findByIdAndUpdate(id, { token: newToken }, { new: true });
}
async function findUserByEmail(email) {
   return await this.findOne({ email });
}

//verification
userSchema.statics.createVerificationToken = createVerificationToken;
userSchema.statics.fineByVerificationToken = fineByVerificationToken;
userSchema.statics.verifyUser = verifyUser;

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

const userModule = mongoose.model(user, userSchema);

module.exports = userModule;
