//auth
async function findUserByIdAndUpdate(userID, newParams) {
   return await this.findByIdAndUpdate(userID, { $set: newParams }, { new: true });
}
async function updateToken(id, accessToken) {
   return await this.findByIdAndUpdate(id, { accessToken }, { new: true });
}

async function updateAccessToken(id, accessToken) {
   return await this.findByIdAndUpdate(id, { accessToken }, { new: true });
}

async function addTokensForUser(id, accessToken, refreshToken) {
   return await this.findByIdAndUpdate(id, { accessToken, refreshToken, sid: id }, { new: true });
}

async function findUserByEmail(email) {
   return await this.findOne({ email });
}

//verification
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

module.exports = {
   verifyUser,
   fineByVerificationToken,
   createVerificationToken,
   findUserByEmail,
   addTokensForUser,
   updateAccessToken,
   updateToken,
   findUserByIdAndUpdate,
};
