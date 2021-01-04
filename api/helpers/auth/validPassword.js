'use strict';

const { hash } = require('../');
const { getHashPassword } = hash;

module.exports = async (pass, user) => {
   try {
      const { password } = user;

      const isPasswordValid = await getHashPassword(pass, password);

      if (!isPasswordValid) {
         const err = new Error('Email or password is wrong');
         err.code = 401;
         throw err;
      }

      return isPasswordValid;
   } catch (error) {
      throw error;
   }
};
