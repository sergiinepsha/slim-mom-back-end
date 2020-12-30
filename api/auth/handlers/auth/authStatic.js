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

module.exports = {
   findUserByEmail,
   addTokensForUser,
   updateAccessToken,
   findUserByIdAndUpdate,
};
