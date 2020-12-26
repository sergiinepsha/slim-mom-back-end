//auth
async function findUserByIdAndUpdate(userID, newParams) {
   return await this.findByIdAndUpdate(userID, { $set: newParams }, { new: true });
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

module.exports = {
   findUserByEmail,
   addTokensForUser,
   updateAccessToken,
   findUserByIdAndUpdate,
};
