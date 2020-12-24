const jwt = require('jsonwebtoken');
require('dotenv').config();

const { RequestError } = require('./index');
// const { contactModule } = require('@data');
const { userModule } = require('../../users/auth/data/userSchema');

const { JWT_SECRET } = process.env;

async function updateContactToken(userID, value) {
   try {
      // if (value === null) {
      //    return await contactModule.updateToken(userID, null);
      // }
      // const options = {
      //    expiresIn: 2 * 24 * 60 * 60, //two days
      // };
      // const token = await jwt.sign({ id: userID }, JWT_SECRET, options);
      // const newToken = await contactModule.updateToken(userID, token);
      // return newToken.token;
   } catch (error) {
      throw error;
   }
}

async function updateUserToken(userID, value) {
   try {
      if (value === null) {
         return await userModule.updateToken(userID, null);
      }
      const options = {
         expiresIn: 2 * 24 * 60 * 60, //two days
      };
      const token = await jwt.sign({ id: userID }, JWT_SECRET, options);
      const newToken = await userModule.updateToken(userID, token);

      return newToken.token;
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
   updateContactToken,
   validToken,
};
