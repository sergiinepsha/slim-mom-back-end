'use strict';

const userModel = require('../../models/user.model');

module.exports = async email => {
   try {
      const user = await userModel.findUserByEmail(email);

      if (!user) {
         const err = new Error('Email or password is wrong');
         err.code = 401;
         throw err;
      }

      return user;
   } catch (error) {
      throw error;
   }
};
