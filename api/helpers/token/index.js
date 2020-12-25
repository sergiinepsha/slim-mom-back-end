const jwt = require('jsonwebtoken');
require('dotenv').config();

const { RequestError } = require('./index');
// const { contactModule } = require('@data');
const userModule = require('../../users/userSchema');

const { JWT_SECRET } = process.env;

async function updateUserToken(userID, value) {
   try {
      if (value === null) {
         return await userModule.updateAccessToken(userID, null);
      }
      const accessToken = { expiresIn: 30 * 60 };
      const token = await jwt.sign({ id: userID }, JWT_SECRET, accessToken);
      const newToken = await userModule.updateToken(userID, token);
      return newToken.accessToken;
   } catch (error) {
      throw error;
   }
}

async function addForUserTokens(userID, value) {
   try {
      if (value === null) {
         return await userModule.addTokensForUser(userID, null);
      }
      const refreshTokenOptions = { expiresIn: 2 * 24 * 60 * 60 };
      const accessTokenOptions = { expiresIn: 30 * 60 };

      const accessToken = await jwt.sign({ id: userID }, JWT_SECRET, accessTokenOptions);
      const refreshToken = await jwt.sign({ id: userID }, JWT_SECRET, refreshTokenOptions);

      const newToken = await userModule.addTokensForUser(userID, accessToken, refreshToken);

      return newToken;
   } catch (error) {
      throw error;
   }
}

async function validToken(token) {
   try {
      const verifyToken = await jwt.verify(token, JWT_SECRET);
      if (!verifyToken) {
         throw new RequestError({ message: 'Not validations token' }, 404);
      }
      return verifyToken;
   } catch (error) {
      throw error;
   }
}

module.exports = {
   updateUserToken,
   addForUserTokens,
   validToken,
};
