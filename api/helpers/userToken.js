'use strict';

const jwt = require('jsonwebtoken');

const userModel = require('../models/user.model');
const config = require('../config');

async function createToken(id, options) {
   try {
      return jwt.sign({ id }, config.jwtSecret, options);
   } catch (error) {
      throw error;
   }
}

module.exports = {
   updateUserToken: async (userID, value) => {
      try {
         if (value === null) {
            return await userModel.updateAccessToken(userID, null);
         }

         const accessTokenOptions = { expiresIn: 120 * 60 };

         const accessToken = await createToken(userID, accessTokenOptions);

         const newToken = await userModel.updateAccessToken(userID, accessToken);

         return newToken.accessToken;
      } catch (error) {
         throw error;
      }
   },

   addForUserTokens: async (userID, value) => {
      try {
         if (value === null) {
            return await userModel.addTokensForUser(userID, null);
         }

         const accessTokenOptions = { expiresIn: 120 * 60 };
         const refreshTokenOptions = { expiresIn: 2 * 24 * 60 * 60 };

         const accessToken = await createToken(userID, accessTokenOptions);
         const refreshToken = await createToken(userID, refreshTokenOptions);

         const newToken = await userModel.addTokensForUser(userID, accessToken, refreshToken);

         return newToken;
      } catch (error) {
         throw error;
      }
   },

   validToken: token => {
      const verifyToken = jwt.verify(token, config.jwtSecret);

      if (!verifyToken) {
         const err = new Error('User not authorized');
         err.code = 401;
         throw err;
      }

      return verifyToken;
   },
};
