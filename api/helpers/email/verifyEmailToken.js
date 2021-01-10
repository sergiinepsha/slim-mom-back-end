'use strict';

const userModel = require('../../models/user.model');

module.exports = async token => {
   try {
      const userToken = await userModel.fineByVerificationToken(token);

      if (!userToken) {
         const err = new Error('User not found');
         err.code = 404;
         throw err;
      }

      await userModel.verifyUser(userToken._id);
   } catch (error) {
      throw error;
   }
};
