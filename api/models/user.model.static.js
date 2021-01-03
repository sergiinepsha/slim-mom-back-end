'use strict';

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

module.exports = {
   findUserByIdAndUpdateDays,
   findUserByIdAndUpdateUserData,
   findUserByEmail,
   addTokensForUser,
   updateAccessToken,
   findUserByIdAndUpdate,
   verifyUser,
   fineByVerificationToken,
   createVerificationToken,
};
