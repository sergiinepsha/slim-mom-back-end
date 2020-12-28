const jwt = require('jsonwebtoken');
require('dotenv').config();

const { RequestError } = require('../../helpers');
const userModule = require('../../users/user.model');

const { JWT_SECRET } = process.env;

async function updateUserToken(userID, value) {
   try {
      if (value === null) {
         return await userModule.updateAccessToken(userID, null);
      }
      const accessTokenOptions = { expiresIn: 120 * 60 };
      const accessToken = await createToken(userID, accessTokenOptions);
      const newToken = await userModule.updateAccessToken(userID, accessToken);
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
      const accessTokenOptions = { expiresIn: 120 * 60 };

      const accessToken = await createToken(userID, accessTokenOptions);
      const refreshToken = await createToken(userID, refreshTokenOptions);

      const newToken = await userModule.addTokensForUser(userID, accessToken, refreshToken);

      return newToken;
   } catch (error) {
      throw error;
   }
}

async function createToken(id, options) {
   try {
      return jwt.sign({ id }, JWT_SECRET, options);
   } catch (error) {
      throw error;
   }
}

async function validToken(token) {
   try {
      const verifyToken = await jwt.verify(token, JWT_SECRET);
      if (!verifyToken) {
         throw new RequestError('Not validations token', 404);
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
