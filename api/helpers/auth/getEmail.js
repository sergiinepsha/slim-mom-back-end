'use strict';

const userModel = require('../../models/user.model');

module.exports = async email => {
   try {
      const user = await userModel.findUserByEmail(email);

      if (!user) {
         throw new Error('Email or password is wrong').code(401);
      }

      return user;
   } catch (error) {
      throw error;
   }
};
