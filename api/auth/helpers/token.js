const jwt = require('jsonwebtoken');

const userModel = require('../../users/user.model');

const { JWT_SECRET } = process.env;

async function createToken(id, options) {
   try {
      return jwt.sign({ id }, JWT_SECRET, options);
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
      try {
         const verifyToken = jwt.verify(token, JWT_SECRET);

         if (!verifyToken) {
            throw new Error('Not validations token').code(404);
         }

         return verifyToken;
      } catch (error) {
         throw error;
      }
   },
};
